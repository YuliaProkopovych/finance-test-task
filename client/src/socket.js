import { io } from "socket.io-client";
import config from './config';

const socket = io(config.SOCKET_URL);
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

export const startSocketConnection = () => {
  socket.on('connect', () => {
    socket.emit('start');
  });
}

export const closeSocketConnection = () => {
  socket.off("ticker", () => {});
}

export const onTickerMessage = (updateTickersFunction) => {
  socket.on('ticker', (payload) => {
    updateTickersFunction(payload);
  });
}
