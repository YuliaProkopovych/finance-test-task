import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Tickers from './tickers';
import store from '../app/store';

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store,
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

const socketWithConnectionError = {
  onConnectionLost: (connectionOffFunction) => { },
  onConnectionError: (errorFunction) => {
    errorFunction();
  },
  startSocketConnection: () => {},
  closeSocketConnection: () => {},
  onTickerMessage: (updateTickersFunction) => {},
};

test('on connection error', async () => {
  renderWithProviders(<Tickers socket={socketWithConnectionError} />, { store, preloadedState: { tickers: [] }})

  expect(screen.getByText(/Looks like we are having problems, please try again later!/i)).toBeInTheDocument();
  expect(screen.queryByText(/Loading, please wait.../i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Lost connection. Can't update!/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Exchange/i)).not.toBeInTheDocument();
});

const socketWithBadData = {
  onConnectionLost: (connectionOffFunction) => { },
  onConnectionError: (errorFunction) => {},
  startSocketConnection: () => {},
  closeSocketConnection: () => {},
  onTickerMessage: (updateTickersFunction) => {
    updateTickersFunction({});
  }
};

test('on connection and loading', async () => {
  renderWithProviders(<Tickers socket={socketWithBadData} />, { store, preloadedState: { tickers: [] }})

  expect(screen.getByText(/Loading, please wait.../i)).toBeInTheDocument();
  expect(screen.queryByText(/Looks like we are having problems, please try again later!/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Lost connection. Can't update!/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Exchange/i)).not.toBeInTheDocument();
});

test('on connection and bad data', async () => {
  renderWithProviders(<Tickers socket={socketWithBadData} />, { store, preloadedState: { tickers: [] }})

  setInterval(() => {
    screen.debug();
    expect(screen.getByText(/Looks like we are having problems, please try again later!/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading, please wait.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Lost connection. Can't update!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Exchange/i)).not.toBeInTheDocument();
  }, 6000);

});

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}
const tickers = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA',
];

function getQuotes() {

  const quotes = tickers.map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: '',
  }));

  return quotes;
}

const socketWithCorrectData = {
  onConnectionLost: (connectionOffFunction) => { },
  onConnectionError: (errorFunction) => {},
  startSocketConnection: () => {},
  closeSocketConnection: () => {},
  onTickerMessage: (updateTickersFunction) => {
    updateTickersFunction(getQuotes());
  }
}

test('on connection and correct data', async () => {
  renderWithProviders(<Tickers socket={socketWithCorrectData} />, { store, preloadedState: { tickers: [] }})

  screen.debug();
  expect(await screen.findByText(/Exchange/i)).toBeInTheDocument();
  expect(screen.queryByText(/Loading, please wait.../i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Lost connection. Can't update!/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/Looks like we are having problems, please try again later!/i)).not.toBeInTheDocument();;
});

const socketWithLostConnection = {
  onConnectionLost: (connectionOffFunction) => {
    setInterval(() => {
      connectionOffFunction();
    }, 5000);
  },
  onConnectionError: (errorFunction) => {},
  startSocketConnection: () => {},
  closeSocketConnection: () => {},
  onTickerMessage: (updateTickersFunction) => {
    updateTickersFunction(getQuotes());
  }
}

test('on lost connection', async () => {
  renderWithProviders(<Tickers socket={socketWithLostConnection} />, { store, preloadedState: { tickers: [] }})

  setInterval(() => {
    expect(screen.queryByText(/Exchange/i)).toBeInTheDocument();
    expect(screen.queryByText(/Lost connection. Can't update!/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading, please wait.../i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Looks like we are having problems, please try again later!/i)).not.toBeInTheDocument();
  }, 7000);
});
