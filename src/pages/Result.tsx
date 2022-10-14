import React from 'react'
import { FormDataTable } from '../components/FormDataTable/FormDataTable'
import styles from '../styles/Result.module.scss'

const Result = () => {
  return (
    <div className={styles.content}>
      <FormDataTable />
    </div>
  )
}

export default Result
