import React from 'react'
import { ProgressBar } from 'primereact/progressbar'
import styles from './AppProgressBar.module.scss'

interface AppSpinnerProps {
  fetching: boolean
}

export const AppProgressBar: React.FC<AppSpinnerProps> = ({ fetching }) => {
  return (
    <>
      {fetching ? (
        <div className={styles.wrapper}>
          <div className={styles.progress}>
            <ProgressBar mode="indeterminate" style={{ height: '6px' }} />
          </div>
        </div>
      ) : null}
    </>
  )
}
