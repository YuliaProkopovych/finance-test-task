import React from 'react'

import { Box, Heading } from 'grommet';

import socket from '../socket'

import Tickers from '../features/tickers'
import IntervalForm from './intervalForm'

function Watchlist() {
  return (
    <Box pad="medium">
      <Heading level="3">Your watchlist</Heading>
      <IntervalForm />
      <Tickers socket={socket} />
    </Box>
  )
}

export default Watchlist;
