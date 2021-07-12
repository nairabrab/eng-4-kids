import React, { FC } from 'react'
import clsx from 'clsx'

import styles from './toggle.module.scss'

interface Props {
  value?: true
  toggle: () => void
  text: string
}

export const Toggle: FC<Props> = ({ value, toggle, text }) => {
  return (
    <div className={styles.container}>
      <label className={styles.toggle}>
        <input type='checkbox' value={text} onChange={toggle} checked={!!value} />
        <span />
        <p className={clsx(styles.text, value && styles.active)}>{text}</p>
      </label>
    </div>
  )
}
