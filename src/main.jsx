import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import store from './app/store'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
// import { ThemeProvider as NextThemesProvider } from "next-themes";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
