import React, { FC } from 'react'

import { ErrorIcon, SuccessIcon } from '../Icons'

import styles from './card.module.scss'

interface Properties {
  word: string
  image: string
  onClick: () => void
  isWrong: boolean
  isMatch?: true
}

export const GameCard: FC<Properties> = ({ word, onClick, image, isMatch, isWrong }) => {
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
