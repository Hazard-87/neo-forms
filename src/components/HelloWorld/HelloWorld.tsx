import React from 'react'
import styles from './HelloWorld.module.scss'

interface HelloWorldProps {
  title: string
}

export const HelloWorld: React.FC<HelloWorldProps> = ({ title }) => {
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  )
}
