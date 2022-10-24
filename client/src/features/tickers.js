import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { change } from './tickersSlice'

import { startSocketConnection, closeSocketConnection, onTickerMessage } from '../socket'

import TickersTable from '../components/tickersTable';

function Tickers() {
  const tickers = useSelector((state) => {
    return state.tickers.tickers;
  })
  const dispatch = useDispatch();

  useEffect(() => {

    startSocketConnection();

    onTickerMessage((payload) => {
      dispatch(change(payload));
    });

    return () => {
      closeSocketConnection();
    };
  }, [dispatch]);

  return (
    <TickersTable tickers={tickers} />
  )
}

export default Tickers;
