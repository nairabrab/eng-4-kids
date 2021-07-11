import React, { Suspense, useState } from 'react'
import clsx from 'clsx'
import { NavLink as Link, Route, Switch } from 'react-router-dom'

import routes from '../routes'
import { dataArray } from '../data'

import styles from './app.module.scss'

export default (): JSX.Element => {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSideBar = () => {
    setSidebarActive(status => !status)
  }

  return (
    <section className={styles.section}>
      <aside className={clsx(styles.aside, sidebarActive && styles.active)}>
        <Link activeStyle={{ color: 'red' }} exact to='/'>
          Main Page
        </Link>
        {dataArray.map(({ deckName, id }) => (
          <Link activeStyle={{ color: 'red' }} key={id} to={`/cards/${id}`}>
            {deckName}
          </Link>
        ))}
        <Link activeStyle={{ color: 'red' }} to='/stats'>
          Stats
        </Link>
      </aside>
      <main className={clsx(styles.main, sidebarActive && styles.open)}>
        <button type='button' onClick={toggleSideBar}>
          ToggleNav
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map(({ component, path }) => (
              <Route key={path} path={path} component={component} />
            ))}
          </Switch>
        </Suspense>
      </main>
    </section>
  )
}
