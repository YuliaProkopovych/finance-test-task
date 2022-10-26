'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

const bodyParser = require('body-parser')

const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {

  const quotes = tickers.map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(-200, 200, 2),
    changePercent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    lastTradeTime: utcDate(),
  }));

  socket.emit('ticker', quotes);
}


let timer;
let connectedSocket;
function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  timer = setInterval(function() {
    getQuotes(socket);
  }, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

function updateTimeInterval(interval) {
  clearInterval(timer);

  timer = setInterval(function() {
    getQuotes(connectedSocket);
  }, interval);
}

const app = express();
app.use(cors());
app.use(bodyParser.json())
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/set-interval', function(req, res) {
  try {
    const interval = req.body?.interval;
    if(interval) {
      updateTimeInterval(interval);
    }
    res.send(`set interval to ${interval}`);
  } catch (error) {
    console.error(error);
  }

});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
    connectedSocket = socket;
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
