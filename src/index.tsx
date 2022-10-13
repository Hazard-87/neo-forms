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

export const Context = createContext(null as any)

const app = initializeApp({
  apiKey: 'AIzaSyD_QPzALXmaifGr89uXwnMukml_9x1Ak10',
  authDomain: 'neo-forms.firebaseapp.com',
  projectId: 'neo-forms',
  storageBucket: 'neo-forms.appspot.com',
  messagingSenderId: '629071013494',
  appId: '1:629071013494:web:92af711be2972b62d9a157',
  measurementId: 'G-M3TPRDJEWM'
})
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
