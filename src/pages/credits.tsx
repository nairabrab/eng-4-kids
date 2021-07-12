import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, resetGameMode } from '../store'

import happyImage from '../../public/assets/img/happy.jpg'
import sadImage from '../../public/assets/img/sad.jpg'
import failureSrc from '../../public/assets/audio/failure.mp3'
import successSrc from '../../public/assets/audio/success.mp3'

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

  useEffect(() => {
    const playMatchSound = async () => {
      // gameStatus ?
      if (gameStatus === 'victory') await new Audio(successSrc).play()
      if (gameStatus === 'game over') await new Audio(failureSrc).play()
    }
    void playMatchSound()
    setTimeout(() => history.push('/'), 2000)
  })
  // [gameStatus, history]

  return (
    <div>
      <h1>Hello Stranger</h1>
      <h2>{gameStatus}</h2>
      <img src={gameStatus === 'victory' ? happyImage : sadImage} alt='game statuss' />
    </div>
  )
}
