import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { change } from './tickersSlice'

import { Text, Box } from 'grommet'

import TickersTable from '../components/tickersTable';

function Tickers({ socket }) {
  const [ connectionError, setConnectionError ] = useState(false);
  const [ connectionLost, setConnectionLost ] = useState(false);

  const tickers = useSelector((state) => {
    return state.tickers.tickers;
  });

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
      if(tickers.length === 0) {
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

  return (
    <>
    { tickers.length !== 0  ? (
      <Box>
        { connectionLost && <Text>Lost connection. Can't update!</Text> }
        <TickersTable tickers={tickers} />
      </Box>
    ) : (
      <Text>{ connectionError ? 'Looks like we are having problems, please try again later!' : 'Loading, please wait...' }</Text>
    )}
    </>
  )
}

export default Tickers;
