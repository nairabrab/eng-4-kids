import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, resetGameMode } from '../store'

export default (): JSX.Element => {
  const dispatch = useDispatch()
  const history = useHistory()
  const gameStatus = useSelector((state: FullState) => state.game.gameStatus)

  useEffect(() => {
    if (gameStatus !== 'game over' && gameStatus !== 'victory') {
      history.push('/')
    }
    return () => {
      dispatch(resetGameMode())
    }
  }, [dispatch, gameStatus, history])

  return (
    <div>
      <h1>Hello Stranger</h1>
      <h2>{gameStatus}</h2>
    </div>
  )
}
