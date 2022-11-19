import React from 'react'
import ReactDOM from 'react-dom/client'
import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './styles/index.scss'
import App from './App'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

serviceWorkerRegistration.register()

reportWebVitals()
