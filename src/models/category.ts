import { Data, IMAGE_PATH, dataArray } from '../data'

export interface Category {
  name: string
  image: string
  id: string
}

const categoryBuilder = ({ deckName: name, id, items }: Data): Category => ({
  name,
  id,
  image: `${IMAGE_PATH}${items.sort(() => 0.5 - Math.random())[0].word}.jpg`,
})

export const categories = dataArray.map(data => categoryBuilder(data))
