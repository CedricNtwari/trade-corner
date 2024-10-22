import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import SignInForm from '../SignInForm'
import { useSetCurrentUser } from '../../../contexts/CurrentUserContext.js'
import { useSetCart } from '../../../contexts/CartContext.js'

jest.mock('axios')
jest.mock('../../../contexts/CurrentUserContext.js')
jest.mock('../../../contexts/CartContext.js', () => ({
  useSetCart: jest.fn(() => ({
    fetchCart: jest.fn(),
  })),
}))

describe('SignInForm', () => {
  const mockSetCurrentUser = jest.fn()
  const mockFetchCart = jest.fn()

  beforeEach(() => {
    useSetCurrentUser.mockReturnValue(mockSetCurrentUser)
    useSetCart.mockReturnValue({ fetchCart: mockFetchCart })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders the form fields and submit button', () => {
    render(
      <Router>
        <SignInForm />
      </Router>,
    )

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  test('displays errors when validation fails', async () => {
    const mockError = {
      response: {
        data: {
          username: ['This field is required.'],
          password: ['This field is required.'],
        },
      },
    }
    axios.post.mockRejectedValueOnce(mockError)

    render(
      <Router>
        <SignInForm />
      </Router>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/this field is required/i)
      expect(errorMessages).toHaveLength(2)
    })
  })

  test('submits form successfully and shows success message', async () => {
    const mockData = {
      user: { username: 'testuser' },
    }
    axios.post.mockResolvedValueOnce({ data: mockData })

    render(
      <Router>
        <SignInForm />
      </Router>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockSetCurrentUser).toHaveBeenCalledWith(mockData.user)
      expect(mockFetchCart).toHaveBeenCalled()
      expect(screen.getByText(/you have successfully signed in/i)).toBeInTheDocument()
    })
  })

  test('displays server error on unsuccessful submission', async () => {
    const mockError = {
      response: {
        data: {
          non_field_errors: ['Unable to log in with provided credentials.'],
        },
      },
    }
    axios.post.mockRejectedValueOnce(mockError)

    render(
      <Router>
        <SignInForm />
      </Router>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wronguser' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/unable to log in with provided credentials/i)).toBeInTheDocument()
    })
  })

  test('redirects to signup page', () => {
    render(
      <Router>
        <SignInForm />
      </Router>,
    )

    const signupLink = screen.getByRole('link', { name: /sign up now/i })
    expect(signupLink).toHaveAttribute('href', '/signup')
  })
})
