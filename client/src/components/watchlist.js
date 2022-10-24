import React from 'react'

import { Box, Heading } from 'grommet';
import Tickers from '../features/tickers'

function Watchlist({ tickers }) {

  return (
    <Box pad="medium">
      <Heading level="3">Your watchlist</Heading>
      <Tickers />
    </Box>
  )
}

export default Watchlist;
