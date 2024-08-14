import React from 'react'
import { store } from './src/store'
import { AppRouter } from './src/router/AppRouter'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export const GasApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}
