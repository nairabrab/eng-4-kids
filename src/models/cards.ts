import { AUDIO_PATH, IMAGE_PATH } from '../data'

export interface Card {
  audioSrc: string
  image: string
  match?: true
  order: number
  translation: string
  word: string
}

interface CardBuilderArguments {
  word: string
  translation: string
  order: number
}

export const cardBuilder = ({ word, translation, order }: CardBuilderArguments): Card => ({
  word,
  translation,
  order,
  image: `${IMAGE_PATH}${word}.jpg`,
  audioSrc: `${AUDIO_PATH}${word}.mp3`,
})
