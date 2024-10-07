import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  test('renders spinner without message', () => {
    render(<LoadingSpinner />)

    const spinnerElement = screen.getByTestId('spinner')
    expect(spinnerElement).toBeInTheDocument()
    expect(screen.queryByText(/message/i)).not.toBeInTheDocument()
  })

  test('renders spinner with message', () => {
    render(<LoadingSpinner message="Loading..." />)

    const spinnerElement = screen.getByTestId('spinner')
    expect(spinnerElement).toBeInTheDocument()
    const messageElement = screen.getByText(/loading.../i)
    expect(messageElement).toBeInTheDocument()
  })
})
