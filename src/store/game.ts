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
  lastAction?: [true | undefined, string]
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

interface ClickCardPayload {
  id: string
  order: number
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
    // setCurrentCard: (state, { payload }: PayloadAction<string>) => {
    //   const currentDeckIndex = state.currentDeck

    //   if (!currentDeckIndex) {
    //     return
    //   }

    //   const currentCard = state.decks[currentDeckIndex].cards.find(card => card.word === payload)
    //   if (currentCard) {
    //     state.currentCard = currentCard
    //   }
    // },
    gameModeOn: state => {
      state.isGame = true
    },
    resetGameMode: state => {
      state.isGame = undefined
      state.currentCard = undefined
      state.gameStatus = 'idle'
      state.currentWrong = []
      state.decks = initialState.decks
    },
    startGame: state => {
      if (state.currentDeck) {
        state.currentWrong = []
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
    repeatWord: state => {
      void new Audio(state.currentCard?.audioSrc).play()
    },
    clickCard: (state, { payload }: PayloadAction<ClickCardPayload>) => {
      const { id, order } = payload
      if (!state.isGame || state.gameStatus === 'idle') {
        return
      }
      state.lastAction = [undefined, id]
      if (!state.currentDeck || !state.currentCard) {
        return
      }
      const isCurrentIndex = state.currentCard.order === order

      if (!isCurrentIndex) {
        state.lastAction = [true, id]
        state.currentWrong.push(order)
        state.isPerfect = false
        return
      }
      const currentDeckIndex = state.currentDeck

      if (!currentDeckIndex) {
        return
      }

      state.decks[currentDeckIndex].cards[order].match = true
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

export const { setCurrentDeck, gameModeOn, resetGameMode, startGame, repeatWord, clickCard } = gameSlice.actions
export default gameSlice.reducer
