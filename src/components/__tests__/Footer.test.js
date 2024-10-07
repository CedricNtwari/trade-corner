import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer modals', () => {
  test('opens and closes Returns modal when the button is clicked', async () => {
    render(<Footer />)

    const returnsButton = screen.getByText(/Returns/i)
    fireEvent.click(returnsButton)

    const modal = await screen.findByRole('dialog')
    expect(modal).toBeInTheDocument()

    const modalContent = within(modal).getByText(/The clothes can be returned within 30 days/i)
    expect(modalContent).toBeInTheDocument()

    const closeButton = within(modal).getByTestId('modal-close-button-Returns')
    fireEvent.click(closeButton)

    await screen.findByRole('dialog', { hidden: true })
  })

  test('opens and closes Shipping modal when the button is clicked', async () => {
    render(<Footer />)

    const shippingButton = screen.getByText(/Shipping/i)
    fireEvent.click(shippingButton)

    const modal = await screen.findByRole('dialog')
    expect(modal).toBeInTheDocument()

    const modalContent = within(modal).getByText(/All articles are sent by A-Post/i)
    expect(modalContent).toBeInTheDocument()

    // Close the modal using the unique `data-testid`
    const closeButton = within(modal).getByTestId('modal-close-button-Shipping')
    fireEvent.click(closeButton)

    await screen.findByRole('dialog', { hidden: true })
  })

  test('opens and closes Imprint modal when the button is clicked', async () => {
    render(<Footer />)

    const imprintButton = screen.getByText(/Imprint/i)
    fireEvent.click(imprintButton)

    const modal = await screen.findByRole('dialog')
    expect(modal).toBeInTheDocument()

    const modalContent = within(modal).getByText(/Seestrasse 80/i)
    expect(modalContent).toBeInTheDocument()

    const closeButton = within(modal).getByTestId('modal-close-button-Imprint')
    fireEvent.click(closeButton)

    await screen.findByRole('dialog', { hidden: true })
  })
})
