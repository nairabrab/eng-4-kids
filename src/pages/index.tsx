import React from 'react'
import { useSelector } from 'react-redux'

import type { FullState } from '../store'
import { Card } from '../components'

export default (): JSX.Element => {
  const categories = useSelector((state: FullState) => state.game.categories)

  return (
    <>
      <h1>English For Kids</h1>
      <section>
        {categories.map(({ name, image, id }) => (
          <Card key={id} name={name} image={image} id={id} />
        ))}
      </section>
    </>
  )
}
