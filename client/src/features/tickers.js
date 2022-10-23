import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { change } from './tickersSlice'
import { io } from "socket.io-client";
import config from "../config";

const socket = io(config.SOCKET_URL);
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

function Tickers() {
  const tickers = useSelector((state) => {
    return state.tickers.tickers;
  })
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('start');
    });

    socket.on('ticker', (payload) => {
      dispatch(change(payload));
    });

    return () => {
      socket.off("ticker", () => {});
    };
  }, [socket]);


  return (
    <div>{tickers.map(ticker => {})}</div>
  )
}

export default Tickers;
