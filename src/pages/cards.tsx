import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, addGameStats, addTrainStats, clickCard, setCurrentDeck, startGame, repeatWord } from '../store'
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
  const [stars, setStars] = useState<boolean[]>([])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (currentWrong.length) setStars([...stars, false])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    else if (currentCard) setStars([...stars, true])
    console.log(stars.slice(1, 3))
    console.log(stars)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWrong, currentCard])

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

  const repeatLastWord = (): void => {
    dispatch(repeatWord())
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

  // Math.floor(Math.random() * 10)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>{currentDeck.name}</h1>
      <div>
        {isGame &&
          stars
            .map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={i} className={el ? 'happy' : 'sad'}>
                {' '}
              </span>
            ))
            .reverse()
            .slice(0, 10)
            .reverse()
            .slice(1)}
      </div>
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
          onClick={gameStatus === 'playing' ? () => repeatLastWord() : () => startNewGame()}>
          {gameStatus === 'playing' ? 'Repeat last word' : 'Start Game'}
        </button>
      )}
    </div>
  )
}
