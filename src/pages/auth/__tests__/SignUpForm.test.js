import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import SignUpForm from '../SignUpForm'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.post(
    'https://ecommerce-backend-api-1-abe8f24df824.herokuapp.com/dj-rest-auth/registration/',
    (req, res, ctx) => {
      return res(ctx.status(201), ctx.json({}))
    },
  ),
  rest.post(
    'https://ecommerce-backend-api-1-abe8f24df824.herokuapp.com/dj-rest-auth/registration/',
    (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({
          username: ['This field is required.'],
          password1: ['This field is required.'],
          password2: ['Passwords do not match.'],
        }),
      )
    },
  ),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('axios')

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('SignUpForm', () => {
  test('renders form fields and submit button', () => {
    render(
      <Router>
        <SignUpForm />
      </Router>,
    )

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/password/i, { selector: 'input[name="password1"]' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  test('displays errors when validation fails', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          username: ['This field is required.'],
          password1: ['This field is required.'],
          password2: ['Passwords do not match.'],
        },
      },
    })

    render(
      <Router>
        <SignUpForm />
      </Router>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input[name="password1"]' }), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: '' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/this field is required/i)
      expect(errorMessages).toHaveLength(2) // Expect two 'required' messages
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    })
  })

  test('handles network error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'))

    render(
      <Router>
        <SignUpForm />
      </Router>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input[name="password1"]' }), {
      target: { value: 'password123' },
    })
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/an unexpected error occurred/i)
      expect(errorMessages).toHaveLength(2)
    })
  })
})
