import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Mock components to avoid unnecessary renders
jest.mock('./components/NavBar', () => {
  const NavBar = () => <div>NavBar</div>
  NavBar.displayName = 'NavBar'
  return NavBar
})
jest.mock('./components/Footer', () => {
  const Footer = () => <div>Footer</div>
  Footer.displayName = 'Footer'
  return Footer
})
jest.mock('./pages/home/HomePage', () => {
  const HomePage = () => <div>Home Page</div>
  HomePage.displayName = 'HomePage'
  return HomePage
})
jest.mock('./pages/auth/SignInForm', () => {
  const SignInForm = () => <div>Sign In</div>
  SignInForm.displayName = 'SignInForm'
  return SignInForm
})
jest.mock('./pages/auth/SignUpForm', () => {
  const SignUpForm = () => <div>Sign Up</div>
  SignUpForm.displayName = 'SignUpForm'
  return SignUpForm
})
jest.mock('./pages/profiles/ProfilePage', () => {
  const ProfilePage = () => <div>Profile Page</div>
  ProfilePage.displayName = 'ProfilePage'
  return ProfilePage
})
jest.mock('./pages/orders/OrderPage', () => {
  const OrderPage = () => <div>Order History</div>
  OrderPage.displayName = 'OrderPage'
  return OrderPage
})
jest.mock('./pages/pageNotFound/PageNotFound', () => {
  const PageNotFound = () => <div>Page Not Found</div>
  PageNotFound.displayName = 'PageNotFound'
  return PageNotFound
})

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
