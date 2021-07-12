import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FullState, addGameStats, addTrainStats, clickCard, setCurrentDeck, startGame, repeatWord } from '../store'
import { GameCard, Button } from '../components'

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
    if (currentWrong.length) setStars([...stars, false])
    else if (currentCard) setStars([...stars, true])
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

  const startGameClick = () => {
    if (gameStatus === 'playing') {
      return repeatLastWord()
    }
    return startNewGame()
  }

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
        <Button onClick={startGameClick}>{gameStatus === 'playing' ? 'Repeat last word' : 'Start Game'}</Button>
      )}
    </div>
  )
}
