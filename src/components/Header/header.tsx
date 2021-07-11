import React, { FC, useState } from 'react'
import clsx from 'clsx'
import { NavLink as Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { dataArray } from '../../data'
import { Burger } from '../Burger'
import { Toggle } from '../Toggle'
import { ChartIcon } from '../Icons'
import { FullState, gameModeOn, resetGameMode } from '../../store'

import styles from './header.module.scss'

export const Header: FC = () => {
  const dispatch = useDispatch()
  const [sidebarActive, setSidebarActive] = useState(false)
  const isGame = useSelector((state: FullState) => state.game.isGame)

  const toggleGameMode = () => {
    if (isGame) {
      return dispatch(resetGameMode())
    }
    return dispatch(gameModeOn())
  }

  const toggleSideBar = () => {
    setSidebarActive(status => !status)
  }

  return (
    <header className={styles.header}>
      <Burger toggle={toggleSideBar} value={sidebarActive} />
      <Toggle text={isGame ? 'Play' : 'Train'} value={isGame} toggle={toggleGameMode} />
      <Link className={styles.link} activeClassName={styles.current} to='/stats'>
        <span>Statistics</span>
        <ChartIcon />
      </Link>
      <aside className={clsx(styles.aside, sidebarActive && styles.active)}>
        <Link activeStyle={{ color: 'red' }} exact to='/'>
          Main Page
        </Link>
        {dataArray.map(({ deckName, id }) => (
          <Link activeStyle={{ color: 'red' }} key={id} to={`/cards/${id}`}>
            {deckName}
          </Link>
        ))}
      </aside>
    </header>
  )
}
