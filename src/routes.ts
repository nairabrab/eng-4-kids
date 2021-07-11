import CardsPage from './pages/cards'
import CreditsPage from './pages/credits'
import StatsPage from './pages/stats'
import MainPage from './pages/index'

export default [
  {
    path: '/stats/',
    component: StatsPage,
  },
  {
    path: '/cards/:deck/',
    component: CardsPage,
  },
  {
    path: '/cards/',
    component: CardsPage,
  },
  {
    path: '/credits/',
    component: CreditsPage,
  },
  {
    path: '/',
    component: MainPage,
  },
]
