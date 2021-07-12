import React, { FC } from 'react'

import styles from './button.module.scss'

interface Props {
  onClick: () => void
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick} type='button'>
      {children}
    </button>
  )
}
