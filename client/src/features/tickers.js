import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { change } from './tickersSlice'

function Tickers() {
  const tickers = useSelector((state) => {
    console.log(state);
    return state.tickers.tickers;
  })
  const dispatch = useDispatch()

  return (
    <div>{tickers[0]}</div>
  )
}

export default Tickers;
