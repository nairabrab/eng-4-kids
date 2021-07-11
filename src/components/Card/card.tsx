import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './card.module.scss'

interface Props {
  image: string
  name: string
  id: string
}

export const Card: FC<Props> = ({ image, name, id }) => {
  return (
    <Link to={`/cards/${id}`} className={styles.card}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
    </Link>
  )
}
