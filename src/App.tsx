import React, { createContext } from 'react'
import './styles/App.scss'
import RoutesComponent from './routes'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  limit,
  startAt,
  orderBy,
  startAfter,
  updateDoc,
  doc,
  setDoc
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

import config from './config'

export const Context = createContext(null as any)

const env = process.env.NODE_ENV
const app = initializeApp(config[env])
const db = getFirestore(app)

function App() {
  const [photos, setPhotos] = React.useState<string[]>([])

  return (
    <Context.Provider
      value={{
        db,
        collection,
        addDoc,
        query,
        getDoc,
        limit,
        getDocs,
        startAt,
        orderBy,
        startAfter,
        updateDoc,
        doc,
        setDoc,
        photos,
        setPhotos
      }}
    >
      <div className="App">
        <RoutesComponent />
      </div>
    </Context.Provider>
  )
}

export default App
