import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, resetStats, sortCards } from '../store'
import { Button } from '../components'

export default (): JSX.Element => {
  const dispatch = useDispatch()
  const cards = useSelector((state: FullState) => state.statistics.cardsWithStatistics)
  const currentSort = useSelector((state: FullState) => state.statistics.currentSort)
  const isAscending = useSelector((state: FullState) => state.statistics.isAscending)

  const reset = () => {
    dispatch(resetStats())
  }

  const sortBy = (column: string) => () => {
    dispatch(sortCards(column))
  }

  return (
    <>
      <h1>Statistics</h1>
      <div style={{ display: 'flex' }}>
        {/* <Button onClick={repeat}>Repeat difficult</Button> */}
        <Button onClick={reset}>Reset</Button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderSpacing: '8px' }}>
          <thead>
            <tr>
              <th>Category</th>
              <th style={{ cursor: 'pointer' }} onClick={sortBy('word')}>
                Word {currentSort === 'word' && (isAscending ? '\u25BC' : '\u25B2')}
              </th>
              <th>Translation</th>
              <th style={{ cursor: 'pointer' }} onClick={sortBy('trainingCount')}>
                Trained {currentSort === 'trainingCount' && (isAscending ? '\u25BC' : '\u25B2')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={sortBy('rightCount')}>
                Correct {currentSort === 'rightCount' && (isAscending ? '\u25BC' : '\u25B2')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={sortBy('mismatchCount')}>
                Incorrect {currentSort === 'mismatchCount' && (isAscending ? '\u25BC' : '\u25B2')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={sortBy('matchPercentage')}>
                % {currentSort === 'matchPercentage' && (isAscending ? '\u25BC' : '\u25B2')}
              </th>
            </tr>
          </thead>
          <tbody>
            {cards.map(({ word, deckName, translation, trainingCount, rightCount, mismatchCount, matchPercentage }) => (
              <tr key={word + deckName}>
                <td>{deckName}</td>
                <td>{word}</td>
                <td>{translation}</td>
                <td>{trainingCount}</td>
                <td>{rightCount}</td>
                <td>{mismatchCount}</td>
                <td>{matchPercentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
