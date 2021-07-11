import React, { FC, MouseEvent, useState } from 'react'
import clsx from 'clsx'

import styles from './card.module.scss'

interface Properties {
  word: string
  image: string
  audioSrc: string
  translation: string
  onClick: () => void
}

export const Card: FC<Properties> = ({ word, translation, image, audioSrc, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false)

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
