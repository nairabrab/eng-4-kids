import React, { FC, MouseEvent, useState } from 'react'
import clsx from 'clsx'

import { ErrorIcon, SuccessIcon, Flip } from '../Icons'

import styles from './card.module.scss'

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
    if (!isGame) {
      await new Audio(audioSrc).play()
    }
    onClick()
  }

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
    <figure className={clsx(styles.card, isFlipped && styles.flipped)} onMouseLeave={flipToFront}>
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
  )
}
