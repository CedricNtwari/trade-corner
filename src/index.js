import React from 'react'
import { createRoot } from 'react-dom/client' // Import createRoot from React 18
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { CurrentUserprovider } from './contexts/CurrentUserContext'

// Get the root element from the DOM
const container = document.getElementById('root')

// Use createRoot to render the application
const root = createRoot(container)

// Render the app with the updated createRoot API
root.render(
  <Router>
    <CurrentUserprovider>
      <CartProvider>
        <App />
      </CartProvider>
    </CurrentUserprovider>
  </Router>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
