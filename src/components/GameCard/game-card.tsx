import React, { FC, MouseEvent, useEffect, useState } from 'react'
import clsx from 'clsx'

import { ErrorIcon, SuccessIcon, Flip } from '../Icons'

import styles from './card.module.scss'

const errorSrc = '/assets/audio/error.mp3'
const correctSrc = '/assets/audio/correct.mp3'

interface Properties {
  word: string
  image: string
  onClick: () => void
  isWrong: boolean
  isMatch?: true
  isGame?: true
  audioSrc: string
  translation: string
}

export const GameCard: FC<Properties> = ({ audioSrc, isGame, word, onClick, image, isMatch, isWrong, translation }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const enrichedClick = async () => {
    if (!isGame && !isFlipped) {
      await new Audio(audioSrc).play()
    }
    onClick()
  }

  useEffect(() => {
    const playMatchSound = async () => {
      if (isMatch) await new Audio(correctSrc).play()
      if (isWrong) await new Audio(errorSrc).play()
    }
    void playMatchSound()
  }, [isMatch, isWrong])

  const flipToFront = () => {
    if (isFlipped) {
      setIsFlipped(false)
    }
  }

  const flipToBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsFlipped(true)
  }

  return (
    <div className={styles.container} onMouseLeave={flipToFront}>
      <figure className={clsx(styles.card, isFlipped && styles.flipped)}>
        {isMatch && <SuccessIcon />}
        {isWrong && <ErrorIcon />}
        <button type='button' onClick={enrichedClick}>
          <img src={image} alt={word} />
          {!isGame && <h3>{isFlipped ? translation : word}</h3>}
        </button>
        {!isGame && !isFlipped && (
          <button onClick={flipToBack} className={styles.flip} type='button'>
            <Flip />
          </button>
        )}
      </figure>
    </div>
  )
}
