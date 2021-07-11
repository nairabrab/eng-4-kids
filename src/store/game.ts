import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Card, Category, Decks, categories, decks } from '../models'

export interface AppState {
  cardsLeft?: Card[]
  categories: Category[]
  currentCard?: Card
  currentDeck?: string
  currentWrong: number[]
  decks: Decks
  gameStatus: 'idle' | 'playing' | 'game over' | 'victory'
  isGame?: true
  isPerfect: boolean
  lastAction?: [true | undefined, number]
}

const initialState: AppState = {
  cardsLeft: undefined,
  categories,
  currentCard: undefined,
  currentDeck: undefined,
  currentWrong: [],
  decks,
  gameStatus: 'idle',
  isPerfect: true,
  lastAction: undefined,
}

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setCurrentDeck: (state, { payload }: PayloadAction<string | undefined>) => {
      if (!payload) {
        return
      }
      if (state.decks[payload]) {
        state.currentDeck = payload
      }
    },
    setCurrentCard: (state, { payload }: PayloadAction<string>) => {
      const currentDeckIndex = state.currentDeck

      if (!currentDeckIndex) {
        return
      }

      const currentCard = state.decks[currentDeckIndex].cards.find(card => card.word === payload)
      if (currentCard) {
        state.currentCard = currentCard
      }
    },
    gameModeOn: state => {
      state.isGame = true
    },
    resetGameMode: state => {
      state.isGame = undefined
      state.currentCard = undefined
      state.gameStatus = 'idle'
      state.decks = initialState.decks
    },
    startGame: state => {
      if (state.currentDeck) {
        state.gameStatus = 'playing'
        state.decks = initialState.decks
        const currentDeckIndex = state.currentDeck
        if (!currentDeckIndex) {
          return
        }
        const cardsInDeck = state.decks[currentDeckIndex].cards
        const indexOfCurrentCard = Math.floor(Math.random() * cardsInDeck.length)
        state.currentCard = cardsInDeck[indexOfCurrentCard]
        const cardsLeft = [...cardsInDeck]
        cardsLeft.splice(indexOfCurrentCard, 1)
        state.cardsLeft = cardsLeft
      }
    },
    clickCard: (state, { payload }: PayloadAction<number>) => {
      if (!state.isGame || state.gameStatus === 'idle') {
        return
      }
      state.lastAction = [undefined, payload]
      if (!state.currentDeck || !state.currentCard) {
        return
      }
      const isCurrentIndex = state.currentCard.order === payload

      if (!isCurrentIndex) {
        state.lastAction = [true, payload]
        state.currentWrong.push(payload)
        state.isPerfect = false
        return
      }
      const currentDeckIndex = state.currentDeck

      if (!currentDeckIndex) {
        return
      }

      state.decks[currentDeckIndex].cards[payload].match = true
      const cardsLeftInDeck = state.cardsLeft
      if (cardsLeftInDeck?.length) {
        const indexOfRandomCard = Math.floor(Math.random() * cardsLeftInDeck.length)
        state.currentCard = cardsLeftInDeck[indexOfRandomCard]
        const cardsLeft = [...cardsLeftInDeck]
        cardsLeft.splice(indexOfRandomCard, 1)
        state.cardsLeft = cardsLeft
        state.currentWrong = []
      } else {
        if (state.isPerfect) {
          state.gameStatus = 'victory'
          return
        }
        state.gameStatus = 'game over'
      }
    },
  },
})

export const { setCurrentDeck, setCurrentCard, gameModeOn, resetGameMode, startGame, clickCard } = gameSlice.actions
export default gameSlice.reducer
