import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Mock components to avoid unnecessary renders
jest.mock('./components/NavBar', () => () => <div>NavBar</div>)
jest.mock('./components/Footer', () => () => <div>Footer</div>)
jest.mock('./pages/home/HomePage', () => () => <div>Home Page</div>)
jest.mock('./pages/auth/SignInForm', () => () => <div>Sign In</div>)
jest.mock('./pages/auth/SignUpForm', () => () => <div>Sign Up</div>)
jest.mock('./pages/profiles/ProfilePage', () => () => <div>Profile Page</div>)
jest.mock('./pages/orders/OrderPage', () => () => <div>Order History</div>)
jest.mock('./pages/pageNotFound/PageNotFound', () => () => <div>Page Not Found</div>)

describe('App Component Routing', () => {
  test('renders HomePage when the path is "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument()
  })

  test('renders SignInForm when the path is "/signin"', () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument()
  })

  test('renders SignUpForm when the path is "/signup"', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument()
  })

  test('renders ProfilePage when the path is "/profiles/:id"', () => {
    render(
      <MemoryRouter initialEntries={['/profiles/1']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Profile Page/i)).toBeInTheDocument()
  })

  test('renders OrderPage when the path is "/order-history"', () => {
    render(
      <MemoryRouter initialEntries={['/order-history']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Order History/i)).toBeInTheDocument()
  })

  test('renders PageNotFound for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
  })
})
