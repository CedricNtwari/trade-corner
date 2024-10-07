import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AlertMessage from '../AlertMessage'

describe('AlertMessage Component', () => {
  test('renders with the correct message and variant', () => {
    const message = 'Test message'
    const variant = 'success'

    render(<AlertMessage message={message} variant={variant} />)

    const alertElement = screen.getByText(message)
    expect(alertElement).toBeInTheDocument()
    expect(alertElement.closest('.alert')).toHaveClass('alert-success')
  })

  test('calls onClose when close button is clicked', () => {
    const message = 'Test message'
    const variant = 'success'
    const onClose = jest.fn()

    render(<AlertMessage message={message} variant={variant} onClose={onClose} />)

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
