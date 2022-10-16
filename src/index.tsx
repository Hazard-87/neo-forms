import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './styles/index.scss'
import App from './App'
import { initializeApp } from 'firebase/app'
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
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import config from './config'

export const Context = createContext(null as any)

const env = process.env.NODE_ENV
const app = initializeApp(config[env])
const db = getFirestore(app)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
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
      setDoc
    }}
  >
    <App />
  </Context.Provider>
)

serviceWorkerRegistration.register()

reportWebVitals()
