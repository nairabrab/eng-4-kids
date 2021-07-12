import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CardStats, cardsWithStatistics } from '../models'

export interface StatsState {
  allClicks: number
  allMismatchedClicks: number
  cardsWithStatistics: CardStats[]
  isAscending: boolean
  currentSort?: string
}

const getInitialState = (): StatsState => ({
  allClicks: 0,
  allMismatchedClicks: 0,
  cardsWithStatistics,
  isAscending: false,
})

const initialState = getInitialState()

interface AddStatsPayload {
  isMismatch?: true
  id: string
}

export const statisticsSlice = createSlice({
  name: 'statsState',
  initialState,
  reducers: {
    hydrate: (_, { payload }: PayloadAction<StatsState>) => {
      return payload
    },
    addGameStats: (state, { payload }: PayloadAction<AddStatsPayload>) => {
      const { id, isMismatch } = payload
      const index = state.cardsWithStatistics.findIndex(card => card.id === id)

      if (index === -1) {
        return
      }
      state.allClicks += 1

      const { mismatchCount, rightCount } = state.cardsWithStatistics[index]

      if (isMismatch) {
        state.cardsWithStatistics[index].mismatchCount += 1
        state.allMismatchedClicks += 1
        state.cardsWithStatistics[index].matchPercentage =
          Math.round((rightCount / (mismatchCount + 1 + rightCount)) * 100) || 0
      } else {
        state.cardsWithStatistics[index].rightCount += 1
        state.cardsWithStatistics[index].matchPercentage =
          Math.round(((rightCount + 1) / (mismatchCount + 1 + rightCount)) * 100) || 0
      }
    },
    addTrainStats: (state, { payload }: PayloadAction<string>) => {
      const index = state.cardsWithStatistics.findIndex(card => card.id === payload)
      if (index === -1) {
        return
      }
      state.cardsWithStatistics[index].trainingCount += 1
    },
    resetStats: state => {
      localStorage.clear()
      state.allMismatchedClicks = 0
      state.allClicks = 0
      state.cardsWithStatistics = [...cardsWithStatistics]
      state.isAscending = false
    },
    sortCards: (state, { payload }: PayloadAction<string>) => {
      const cardArray = state.cardsWithStatistics
      switch (payload) {
        case 'word':
          state.cardsWithStatistics = [...cardArray].sort((a, b) =>
            !state.isAscending ? a.word.localeCompare(b.word) : b.word.localeCompare(a.word),
          )
          break
        case 'trainingCount':
        case 'rightCount':
        case 'mismatchCount':
        case 'matchPercentage':
          state.cardsWithStatistics = [...cardArray].sort((a, b) =>
            state.isAscending ? a[payload] - b[payload] : b[payload] - a[payload],
          )
          break

        default:
          break
      }
      state.isAscending = !state.isAscending
      state.currentSort = payload
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

export const { addGameStats, hydrate, addTrainStats, sortCards, resetStats, repeatDifficult } = statisticsSlice.actions
export default statisticsSlice.reducer
