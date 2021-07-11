import { dataArray } from '../data'

import { Card, cardBuilder } from './cards'

export interface Deck {
  cards: Card[]
  name: string
  id: string
}

export type Decks = Record<string, Deck>

export const decks: Decks = dataArray.reduce(
  (accumulator, deck) => ({
    ...accumulator,
    [deck.id]: {
      name: deck.deckName,
      id: deck.id,
      cards: deck.items.map(({ word, translation }, order) => cardBuilder({ word, translation, order })),
    },
  }),
  {},
)
