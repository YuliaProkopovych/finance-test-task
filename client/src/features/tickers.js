import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { change } from './tickersSlice';

import { Text, Box } from 'grommet';

import TickersTable from '../components/tickersTable';
import IntervalForm from '../components/intervalForm';
import Error from '../components/error';
import Loading from '../components/loading';

function Tickers({ socket }) {
  const [connectionError, setConnectionError] = useState(false);
  const [connectionLost, setConnectionLost] = useState(false);

  const tickers = useSelector((state) => (state.tickers.tickers));

  const dispatch = useDispatch();

  useEffect(() => {
    socket.startSocketConnection(() => {
      setConnectionLost(false);
    });

    socket.onConnectionError(() => {
      setConnectionError(true);
    });

    socket.onConnectionLost(() => {
      setConnectionLost(true);
    });

    setInterval(() => {
      if (tickers.length === 0) {
        setConnectionError(true);
      }
    }, 10000);

    socket.onTickerMessage((payload) => {
      dispatch(change(payload));
    });

    return () => {
      socket.closeSocketConnection();
    };
  }, [dispatch]);

  if (tickers.length !== 0) {
    return (
      <Box pad="medium">
        { connectionLost ? <Error type="connection-lost" /> : <IntervalForm />}
        <TickersTable tickers={tickers} />
      </Box>
    );
  } else {
    return (
      <>
        { connectionError ? <Error type="connection-error" /> : <Loading /> }
      </>
    );
  }
}

export default Tickers;
