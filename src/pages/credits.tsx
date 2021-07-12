import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, resetGameMode } from '../store'

const happyImage = '/assets/img/happy.jpg'
const sadImage = '/assets/img/sad.jpg'
const failureSrc = '/assets/audio/failure.mp3'
const successSrc = '/assets/audio/success.mp3'

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
      if (gameStatus === 'victory') await new Audio(successSrc).play()
      if (gameStatus === 'game over') await new Audio(failureSrc).play()
    }
    void playMatchSound()
    setTimeout(() => history.push('/'), 2000)
  })

  return (
    <section>
      <h1>{gameStatus}</h1>
      <img src={gameStatus === 'victory' ? happyImage : sadImage} alt='game statuss' />
    </section>
  )
}
