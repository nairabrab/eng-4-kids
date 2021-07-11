import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, resetStats } from '../store'

export default (): JSX.Element => {
  const dispatch = useDispatch()
  const cards = useSelector((state: FullState) => state.statistics.cardsWithStatistics)

  const onClick = () => {
    dispatch(resetStats())
  }

  return (
    <>
      <div>
        <h1>Statistics</h1>
        <table>
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
                <td>{Math.round((mismatchCount / (mismatchCount + rightCount)) * 100) || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type='button' onClick={onClick}>
        Reset
      </button>
    </>
  )
}
