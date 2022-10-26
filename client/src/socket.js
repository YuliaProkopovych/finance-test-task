import { io } from 'socket.io-client';
import config from './config';

const socket = io(config.SOCKET_URL);

const onConnectionError = (errorFunction) => {
  socket.on('connect_error', () => {
    errorFunction();
  });
};

const onConnectionLost = (connectionOffFunction) => {
  socket.on('disconnect', () => {
    connectionOffFunction();
  });
};

const startSocketConnection = (connectionOnFunction) => {
  socket.on('connect', () => {
    socket.emit('start');
    connectionOnFunction();
  });
};

const closeSocketConnection = () => {
  socket.off('ticker', () => {});
};

const onTickerMessage = (updateTickersFunction) => {
  socket.on('ticker', (payload) => {
    updateTickersFunction(payload);
  });
};

const socketObject = {
  onConnectionLost,
  onTickerMessage,
  closeSocketConnection,
  startSocketConnection,
  onConnectionError,
};

export default socketObject;
