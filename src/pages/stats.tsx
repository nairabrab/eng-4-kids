import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, resetStats, repeatDifficult } from '../store'
import { Button } from '../components'

export default (): JSX.Element => {
  const dispatch = useDispatch()
  const cards = useSelector((state: FullState) => state.statistics.cardsWithStatistics)

  const reset = () => {
    dispatch(resetStats())
  }

  const repeat = () => {
    dispatch(repeatDifficult())
  }

  return (
    <>
      <h1>Statistics</h1>
      <div style={{ display: 'flex' }}>
        <Button onClick={repeat}>Repeat difficult</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderSpacing: '8px' }}>
          <thead>
            <tr>
              {['Category', 'Word', 'Translation', 'Trained', 'Correct', 'Incorrect', '%'].map(element => (
                <th key={element}>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cards.map(({ word, deckName, translation, trainingCount, rightCount, mismatchCount }) => (
              <tr key={word + deckName}>
                <td>{deckName}</td>
                <td>{word}</td>
                <td>{translation}</td>
                <td>{trainingCount}</td>
                <td>{rightCount}</td>
                <td>{mismatchCount}</td>
                <td>{Math.round((rightCount / (mismatchCount + rightCount)) * 100) || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
