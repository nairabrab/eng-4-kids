import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, addGameStats, addTrainStats, clickCard, setCurrentDeck, startGame } from '../store'
import { GameCard } from '../components/GameCard'

interface Parameters {
  deck?: string
}

interface DeckArguments {
  order: number
  id: string
}

export default (): JSX.Element => {
  const dispatch = useDispatch()
  const { deck } = useParams<Parameters>()
  const history = useHistory()
  const currentCard = useSelector((state: FullState) => state.game.currentCard)
  const currentDeck = useSelector((state: FullState) => state.game.decks[state.game.currentDeck || 0])
  const isGame = useSelector((state: FullState) => state.game.isGame)
  const gameStatus = useSelector((state: FullState) => state.game.gameStatus)
  const lastAction = useSelector((state: FullState) => state.game.lastAction)
  const currentWrong = useSelector((state: FullState) => state.game.currentWrong)

  useEffect(() => {
    dispatch(setCurrentDeck(deck))
  }, [dispatch, deck])

  useEffect(() => {
    if (!lastAction || gameStatus === 'idle') {
      return
    }
    const [isMismatch, id] = lastAction
    dispatch(addGameStats({ id, isMismatch }))
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

  const startNewGame = (): void => {
    dispatch(startGame())
  }

  if (!currentDeck) {
    return <div>Please select a valid page from a menu</div>
  }

  const gameCardClick =
    ({ id, order }: DeckArguments) =>
    () => {
      if (isGame) {
        dispatch(clickCard({ order, id }))
        return
      }
      dispatch(addTrainStats(id))
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{currentDeck.name}</h1>
      <section>
        {currentDeck.cards.map(({ word, order, image, match, audioSrc, translation }) => (
          <GameCard
            isGame={isGame}
            translation={translation}
            key={word}
            word={word}
            image={image}
            audioSrc={audioSrc}
            isWrong={currentWrong?.some(element => element === order)}
            isMatch={match}
            onClick={gameCardClick({ order, id: `${currentDeck.id}_${word}` })}
          />
        ))}
      </section>
      {isGame && (
        <button
          style={{
            width: '50%',
            border: 'none',
            background: '#faf',
            padding: '0.5rem',
            marginBottom: '2rem',
            borderRadius: '2rem',
            color: 'white',
          }}
          type='button'
          onClick={startNewGame}>
          Start Game
        </button>
      )}
    </div>
  )
}
