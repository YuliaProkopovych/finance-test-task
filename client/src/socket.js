import { io } from 'socket.io-client';
import config from './config';

const socket = io(config.SOCKET_URL);

const onConnectionError = (errorFunction) => {
  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
    errorFunction();
  });
}

const startSocketConnection = () => {
  socket.on('connect', () => {
    socket.emit('start');
  });
}

const closeSocketConnection = () => {
  socket.off('ticker', () => {});
}

const onTickerMessage = (updateTickersFunction) => {
  socket.on('ticker', (payload) => {
    updateTickersFunction(payload);
  });
}

const socketObject = { onTickerMessage, closeSocketConnection, startSocketConnection, onConnectionError }

export default socketObject;
