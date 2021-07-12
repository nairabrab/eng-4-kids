import React, { FC } from 'react'

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
        <input type='checkbox' value={text} onChange={toggle} defaultChecked={false} />
        <span />
      </label>
      <span>{text}</span>
    </div>
  )
}
