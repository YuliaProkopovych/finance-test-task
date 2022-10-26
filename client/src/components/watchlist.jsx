import React from 'react';

import { Box, Heading } from 'grommet';

import socket from '../socket';
import Tickers from '../features/tickers';

function Watchlist() {
  return (
    <Box pad="medium">
      <Heading level="3">Your watchlist</Heading>
      <Tickers socket={socket} />
    </Box>
  );
}

export default Watchlist;
