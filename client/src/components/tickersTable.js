import React from 'react'

import { Box, DataTable, Text } from 'grommet';
import { LinkDown, LinkUp } from 'grommet-icons';

const tickersNames = {
  'AAPL': 'Apple',
  'GOOGL': 'Alphabet',
  'MSFT': 'Microsoft Corporation',
  'AMZN': 'Amazon.com',
  'FB' : 'Meta Platforms',
  'TSLA': 'Tesla',
};

const tickersColors = {
  'AAPL': '#666666',
  'GOOGL': '#4285f4',
  'MSFT': '#7d4cdb',
  'AMZN': '#c26c03',
  'FB' : '#4267b2',
  'TSLA': '#e31937',
};

function TickersTable({ tickers }) {

  const tableColumns = [
    {
      property: 'ticker',
      header: 'Name',
      primary: true,
      align: 'left',
      render: ({ ticker }) => (
        <Box gap="small" direction="row" align="center">
          <Box style={{ borderRadius: '4px' }} pad="xsmall" background={tickersColors[ticker]}>
            <Text size="small" weight="bold">
              {ticker}
            </Text>
          </Box>
          <Text>
              {tickersNames[ticker]}
          </Text>
        </Box>
        )
    },
    {
      property: 'exchange',
      header: 'Exchange',
      align: 'center',
    },
    {
      property: 'price',
      header: 'Price',
      align: 'center',
    },
    {
      property: 'change',
      header: 'Change \u0024',
      align: 'center',
      render: ({ change }) => (
        <Box pad="small" background={change > 0 ? 'increasingBackground' : 'decreasingBackground'}>
          <Text color={change > 0 ? 'increasingText' : 'decreasingText'}>
            + {change}
          </Text>
        </Box>
        )
    },
    {
      property: 'change_percent',
      header: 'Change \u0025',
      align: 'center',
      render: ({ change, change_percent }) => (
        <Box
          direction="row"
          align="center"
          pad="small"
          background={change > 0 ? 'increasingBackground' : 'decreasingBackground'}
        >
          {change > 0 ? <LinkUp color='increasingText' size='15px' /> : <LinkDown color='decreasingText' size='15px' /> }
          <Text color={change > 0 ? 'increasingText' : 'decreasingText'}>
            {change_percent}
          </Text>
        </Box>
        )
    },
    {
      property: 'dividend',
      header: 'Dividend',
      align: 'center',
    },
    {
      property: 'yield',
      header: 'Yield',
      align: 'center',
    },
    {
      property: 'last_trade_time',
      header: 'Last trade time',
      align: 'center',
      render: ({ last_trade_time }) => {
        const date = new Date(last_trade_time);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, ${date.getDate()}.${date.getMonth()}`;
      }
    },
  ]
  return (
      <Box>
        <DataTable
          pad={{ horizontal: 'small', vertical: 'medium' }}
          columns={tableColumns}
          data={tickers}
          step={tickers.length}
          responsive="true"
        />
      </Box>
  )
}

export default TickersTable;
