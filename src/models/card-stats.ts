import { dataArray } from '../data'

export interface CardStats {
  id: string
  deckName: string
  mismatchCount: number
  rightCount: number
  trainingCount: number
  translation: string
  word: string
}

export interface CardStatsBuilderArguments {
  id: string
  deckName: string
  translation: string
  word: string
}

const cardStatsBuilder = ({ word, translation, deckName, id }: CardStatsBuilderArguments): CardStats => ({
  id: `${id}_${word}`,
  word,
  translation,
  deckName,
  rightCount: 0,
  trainingCount: 0,
  mismatchCount: 0,
})

export const cardsWithStatistics = dataArray.flatMap(({ items, deckName, id }) => {
  return items.map(({ word, translation }) => cardStatsBuilder({ word, translation, deckName, id }))
})
