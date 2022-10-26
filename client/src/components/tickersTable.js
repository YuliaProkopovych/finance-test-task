import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import { Box, DataTable, Text, ResponsiveContext } from 'grommet';
import { LinkDown, LinkUp } from 'grommet-icons';

import { tickersColors, tickersNames } from '../data';
import HideTickerButton from './hideTickerButton';


function TickersTable({ tickers }) {
  const [tickersArray, setTickersArray] = useState(tickers);
  const [disabledTickers, setDisabledTickers] = useState([]);

  //load disabled tickers from local storage
  useEffect(() => {
    const disabledTickersList = JSON.parse(localStorage.getItem('Disabled tickers'));

    if (disabledTickersList) {
      setDisabledTickers(disabledTickersList);
    }
  }, []);

  //update disabled tickers list
  useEffect(() => {
    const newTickersArray = tickers.map((tickerInfo) => {
      const hidden = disabledTickers.includes(tickerInfo.ticker);
      return  { ...tickerInfo, hidden };
    });

    newTickersArray.sort((a, b) => {
      if (a.hidden === b.hidden) {
        return 0;
      } else if (a.hidden === true) {
        return 1;
      } else return -1;
    });

    setTickersArray(newTickersArray);
  }, [disabledTickers, tickers]);

  const switchTicker = (ticker) => {
    let newTickers = disabledTickers;
    if (disabledTickers.length !== 0) {
      if (disabledTickers.includes(ticker)) {
        newTickers = disabledTickers.filter((item) => item !== ticker);
      } else {
        newTickers = disabledTickers.concat(ticker);
      }
    } else {
      newTickers = [ticker];
    }
    localStorage.setItem('Disabled tickers', JSON.stringify(newTickers));
    setDisabledTickers(newTickers);
  }

  const size = useContext(ResponsiveContext);
  const tableColumns = [
    {
      property: 'ticker',
      header: 'Name',
      pin: ['xsmall', 'small', 'medium'].includes(size),
      primary: true,
      align: 'start',
      render: ({ ticker }) => (
        <Box gap="small" direction="row" align="center">
          <Box
            style={{ borderRadius: '4px' }}
            pad="xsmall"
            background={tickersColors[ticker]}
            width={{ min: '65px' }}
            align="center"
          >
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
      render: ({ price, hidden }) => ( hidden ? '--' : price ),
    },
    {
      property: 'change',
      header: 'Change \u0024',
      align: 'center',
      render: ({ change, hidden }) => {
        if (hidden) {
          return '--';
        } else {
          return (
            <Box
              pad="small"
              background={change > 0 ? 'increasingBackground' : 'decreasingBackground'}
              width={{ min: '110px' }}
            >
              {change > 0 ? (
                <Text
                  whiteSpace="nowrap"
                  color="increasingText">
                  + { Math.abs(change) }
                </Text>
              ) : (
                <Text
                  whiteSpace="nowrap"
                  color="decreasingText">
                  - { Math.abs(change) }
                </Text>
              )}
            </Box>
          );
        }
      }
    },
    {
      property: 'change_percent',
      header: 'Change \u0025',
      align: 'center',
      render: ({ change, change_percent, hidden }) => {
        if (hidden) {
          return '--';
        } else {
          return (
            <Box
              direction="row"
              align="center"
              width={{ min: '100px' }}
              pad="small"
              background={change > 0 ? 'increasingBackground' : 'decreasingBackground'}
            >
              {change > 0 ? <LinkUp color='increasingText' size='15px' /> : <LinkDown color='decreasingText' size='15px' /> }
              <Text color={change > 0 ? 'increasingText' : 'decreasingText'}>
                {change_percent}
              </Text>
            </Box>
          );
        }
      },
    },
    {
      property: 'dividend',
      header: 'Dividend',
      align: 'center',
      render: ({ dividend, hidden }) => ( hidden ? '--' : dividend ),
    },
    {
      property: 'yield',
      header: 'Yield',
      align: 'center',
      render: (tickerInfo) => ( tickerInfo.hidden ? '--' : tickerInfo.yield ),
    },
    {
      property: 'last_trade_time',
      header: 'Last trade time',
      align: 'center',
      render: ({ last_trade_time, hidden }) => ( hidden ? '--' : DateTime.fromISO(last_trade_time).toFormat('HH:mm:ss')),
    },
    {
      property: '',
      header: 'Watch/Hide',
      align: 'center',
      render: ({ticker}) => (<HideTickerButton hidden={disabledTickers.includes(ticker)} onTickerSwitch={() => {switchTicker(ticker)}} /> ),
    },
  ]
  return (
      <Box width={{ max: '100%' }} overflow="auto">
        <DataTable
          pad= { ['xlarge', 'large'].includes(size) ? 'medium' : 'small' }
          columns={tableColumns}
          data={tickersArray}
          step={tickersArray.length}
          background={'backgroundWhite'}
          pin
        />
      </Box>
  )
}

TickersTable.propTypes = {
  tickers: PropTypes.array.isRequired,
}

export default TickersTable;
