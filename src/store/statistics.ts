import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CardStats, cardsWithStatistics } from '../models'

export interface StatsState {
  allClicks: number
  allMismatchedClicks: number
  cardsWithStatistics: CardStats[]
}

const getInitialState = (): StatsState =>
  localStorage.getItem('state')
    ? (JSON.parse(localStorage.getItem('state') || '') as StatsState)
    : {
        allClicks: 0,
        allMismatchedClicks: 0,
        cardsWithStatistics,
      }

const initialState = getInitialState()

const setStoredState = (state: StatsState): void => localStorage.setItem('state', JSON.stringify(state))
interface AddStatsPayload {
  isMismatch?: true
  id: string
}

export const statisticsSlice = createSlice({
  name: 'statsState',
  initialState,
  reducers: {
    addGameStats: (state, { payload }: PayloadAction<AddStatsPayload>) => {
      const { id, isMismatch } = payload
      const index = state.cardsWithStatistics.findIndex(card => card.id === id)

      if (index === -1) {
        return
      }
      state.allClicks += 1
      if (isMismatch) {
        state.cardsWithStatistics[index].mismatchCount += 1
        state.allMismatchedClicks += 1
      } else {
        state.cardsWithStatistics[index].rightCount += 1
      }
      setStoredState(state)
    },
    addTrainStats: (state, { payload }: PayloadAction<string>) => {
      const index = state.cardsWithStatistics.findIndex(card => card.id === payload)
      if (index === -1) {
        return
      }
      state.cardsWithStatistics[index].trainingCount += 1
      setStoredState(state)
    },
    resetStats: () => {
      setStoredState({
        allClicks: 0,
        allMismatchedClicks: 0,
        cardsWithStatistics,
      })
      return { ...initialState }
    },
    repeatDifficult: state => {
      const difficultCardDeck = state.cardsWithStatistics
        .filter(card => card.mismatchCount > 0)
        .sort((a, b) => b.mismatchCount - a.mismatchCount)
        .slice(0, 7)
      console.log(difficultCardDeck.length)
      difficultCardDeck.map(el => console.log(el.id))
    },
  },
})

export const { addGameStats, addTrainStats, resetStats, repeatDifficult } = statisticsSlice.actions
export default statisticsSlice.reducer
