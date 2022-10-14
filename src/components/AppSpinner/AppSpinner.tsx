import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'
import styles from './AppSpinner.module.scss'

interface AppSpinnerProps {
  fetching: boolean
}

export const AppSpinner: React.FC<AppSpinnerProps> = ({ fetching }) => {
  return (
    <>
      {fetching ? (
        <div className={styles.center}>
          <ProgressSpinner />
        </div>
      ) : null}
    </>
  )
}
