import React, { FC, Suspense, useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import routes from '../routes'
import { Header } from '../components'

import styles from './app.module.scss'
import Footer from '../components/Footer/Footer'

export const App: FC = () => {
  return (
    <section className={styles.section}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map(({ component, path }) => (
              <Route key={path} path={path} component={component} />
            ))}
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </section>
  )
}
