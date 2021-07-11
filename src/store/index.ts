// import { combineReducers } from 'redux'

import { configureStore } from '@reduxjs/toolkit'

import gameReducer, { AppState } from './game'
import statsReducer, { StatsState } from './statistics'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    statistics: statsReducer,
  },
})

export * from './game'
export * from './statistics'

export interface FullState {
  game: AppState
  statistics: StatsState
}

// const rootReducer = combineReducers({ game: gameReducer, stats: statsReducer })
// export const store = configureStore({rootReducer}
// export default rootReducer
