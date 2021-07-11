import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CardStats, cardsWithStatistics } from '../models'

export interface StatsState {
  allClicks: number
  allMismatchedClicks: number
  cardsWithStatistics: CardStats[]
}

const getInitialState = (): StatsState => ({
  allClicks: 0,
  allMismatchedClicks: 0,
  cardsWithStatistics,
})

const initialState = getInitialState()

interface AddStatsPayload {
  isMismatch?: true
  order: number
}

export const statisticsSlice = createSlice({
  name: 'statsState',
  initialState,
  reducers: {
    addGameStats: (state, { payload }: PayloadAction<AddStatsPayload>) => {
      const { order, isMismatch } = payload
      state.allClicks += 1
      if (!state.cardsWithStatistics[order]) {
        return
      }
      if (isMismatch) {
        state.cardsWithStatistics[order].mismatchCount += 1
        state.allMismatchedClicks += 1
      } else {
        state.cardsWithStatistics[order].rightCount += 1
      }
    },
    addTrainStats: (state, { payload }: PayloadAction<string>) => {
      const index = state.cardsWithStatistics.findIndex(card => card.id === payload)
      if (index === -1) {
        return
      }
      state.cardsWithStatistics[index].trainingCount += 1
    },
    resetStats: () => initialState,
  },
})

export const { addGameStats, addTrainStats, resetStats } = statisticsSlice.actions
export default statisticsSlice.reducer
