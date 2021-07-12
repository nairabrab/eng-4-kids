import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.scss'
import { App } from './app'
import { store, hydrate, StatsState } from './store'

const getStatsFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem('stats')
    if (persistedState) return JSON.parse(persistedState) as StatsState
    return null
  } catch (e) {
    return null
  }
}

const stats = getStatsFromLocalStorage()

if (stats) {
  store.dispatch(hydrate(stats))
}

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.querySelector('#root'),
)
