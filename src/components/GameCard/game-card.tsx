import React, { FC, MouseEvent, useState } from 'react'
import clsx from 'clsx'

import { ErrorIcon, SuccessIcon } from '../Icons'

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

  if (isGame) {
    return (
      <figure className={styles.card}>
        {isMatch && <SuccessIcon />}
        {isWrong && <ErrorIcon />}
        <button type='button' onClick={onClick}>
          <img src={image} alt={word} />
        </button>
      </figure>
    )
  }

  const playAudio = async () => {
    await new Audio(audioSrc).play()
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
      <button type='button' onClick={playAudio}>
        <img src={image} alt={word} />
        <h3>{isFlipped ? translation : word}</h3>
      </button>
      {!isFlipped && (
        <button onClick={flipToBack} type='button'>
          Revert
        </button>
      )}
    </figure>
  )
}
