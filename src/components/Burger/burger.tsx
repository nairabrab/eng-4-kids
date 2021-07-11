import React, { FC } from 'react'
import clsx from 'clsx'

import styles from './burger.module.scss'

interface Props {
  value: boolean
  toggle: () => void
}

export const Burger: FC<Props> = ({ value, toggle }) => {
  return (
    <button type='button' onClick={toggle} className={clsx(styles.burger, value && styles.active)}>
      <span />
      <span />
      <span />
    </button>
  )
}
