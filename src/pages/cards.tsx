import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Card } from '../components'
import {
  FullState,
  addGameStats,
  addTrainStats,
  clickCard,
  gameModeOn,
  resetGameMode,
  setCurrentDeck,
  startGame,
} from '../store'
import { GameCard } from '../components/GameCard'

interface Parameters {
  deck?: string
}

export default (): JSX.Element => {
  const dispatch = useDispatch()
  const { deck } = useParams<Parameters>()
  const history = useHistory()
  const currentCard = useSelector((state: FullState) => state.game.currentCard)
  const currentDeck = useSelector((state: FullState) => state.game.decks[state.game.currentDeck || 0])
  const isGame = useSelector((state: FullState) => state.game.isGame)
  const gameStatus = useSelector((state: FullState) => state.game.gameStatus)
  const allClicks = useSelector((state: FullState) => state.statistics.allClicks)
  const allMismatchedClicks = useSelector((state: FullState) => state.statistics.allMismatchedClicks)
  const lastAction = useSelector((state: FullState) => state.game.lastAction)
  const currentWrong = useSelector((state: FullState) => state.game.currentWrong)

  useEffect(() => {
    dispatch(setCurrentDeck(deck))
  }, [dispatch, deck])

  useEffect(() => {
    if (!lastAction || gameStatus === 'idle') {
      return
    }
    const [isMismatch, order] = lastAction
    dispatch(addGameStats({ order, isMismatch }))
  }, [lastAction, dispatch, gameStatus])

  useEffect(() => {
    if (isGame && currentCard) {
      void new Audio(currentCard.audioSrc).play()
    }
  }, [isGame, currentCard])

  useEffect(() => {
    if (gameStatus === 'game over' || gameStatus === 'victory') {
      history.push('/credits')
    }
  }, [gameStatus, history])

  const toggleGameMode = () => {
    if (isGame) {
      return dispatch(resetGameMode())
    }
    return dispatch(gameModeOn())
  }

  const startNewGame = (): void => {
    dispatch(startGame())
  }

  if (!currentDeck) {
    return <div>Please select a valid page from a menu</div>
  }

  const gameCardClick = (order: number) => () => {
    dispatch(clickCard(order))
  }

  const trainingCardClick = (id: string) => () => {
    dispatch(addTrainStats(id))
  }

  return (
    <div>
      <h1>{currentDeck.name}</h1>
      <h2>{gameStatus}</h2>
      <h3>{`${allMismatchedClicks} / ${allClicks}`}</h3>
      <button type='button' onClick={toggleGameMode}>
        {isGame ? 'Play' : 'Train'}
      </button>
      {isGame && (
        <button type='button' onClick={startNewGame}>
          Start Game
        </button>
      )}
      <section>
        {currentDeck.cards.map(({ word, order, image, match, audioSrc, translation }) =>
          isGame ? (
            <GameCard
              isWrong={currentWrong?.some(element => element === order)}
              isMatch={match}
              image={image}
              onClick={gameCardClick(order)}
              word={word}
              key={word}
            />
          ) : (
            <Card
              translation={translation}
              key={word}
              word={word}
              image={image}
              audioSrc={audioSrc}
              onClick={trainingCardClick(`${currentDeck.id}_${word}`)}
            />
          ),
        )}
      </section>
    </div>
  )
}
