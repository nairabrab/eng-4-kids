import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import type { FullState } from '../store'

export default (): JSX.Element => {
  const categories = useSelector((state: FullState) => state.game.categories)

  return (
    <>
      <div>English For Kids</div>
      {categories.map(({ name, image, id }) => (
        <div key={id}>
          <h2>{name}</h2>
          <Link to={`/cards/${id}`}>
            <img src={image} alt={name} />
          </Link>
        </div>
      ))}
    </>
  )
}
