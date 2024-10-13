import React from 'react'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import AddProductForm from '../AddProductForm'

// Mock axios
jest.mock('axios')

describe('AddProductForm', () => {
  afterEach(() => {
    jest.clearAllMocks() // Clear mock data between tests
  })

  test('displays validation errors when submitting with invalid data', async () => {
    render(
      <Router>
        <AddProductForm />
      </Router>,
    )

    // Click the submit button without entering any data
    const submitButton = screen.getByRole('button', { name: /add product/i })
    fireEvent.click(submitButton)

    // Wait for validation error messages to appear
    await waitFor(() => {
      const errorMessages = screen.getAllByText(
        (content) => content.includes('should') || content.includes('Please'),
      )
      expect(errorMessages).toHaveLength(5) // Expecting 5 errors including category and size
    })
  })

  test('submits the form with valid data', async () => {
    // Mock axios POST request for form submission
    axios.post.mockResolvedValueOnce({
      data: {
        id: 1,
        name: 'New Product',
        description: 'A great new product',
        price: 200,
        stock: 20,
        category: 'men',
        size: 'L',
      },
    })

    await act(async () => {
      render(
        <Router>
          <AddProductForm />
        </Router>,
      )
    })

    // Fill out the form fields
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/product name/i), { target: { value: 'New Product' } })
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: 'A great new product' },
      })
      fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '200' } })
      fireEvent.change(screen.getByLabelText(/stock/i), { target: { value: '20' } })
      fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'men' } })
      fireEvent.change(screen.getByLabelText(/size/i), { target: { value: 'L' } })
    })

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add product/i }))
    })

    // Wait for the POST request to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1)
      expect(axios.post).toHaveBeenCalledWith('/products/', expect.any(FormData))
    })
  })

  test('displays error when service is unavailable', async () => {
    // Mock a 503 Service Unavailable error
    axios.post.mockRejectedValueOnce({
      response: { status: 503 },
    })

    await act(async () => {
      render(
        <Router>
          <AddProductForm />
        </Router>,
      )
    })

    // Fill out the form
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/product name/i), { target: { value: 'New Product' } })
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: { value: 'A great new product' },
      })
      fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '200' } })
      fireEvent.change(screen.getByLabelText(/stock/i), { target: { value: '20' } })
      fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'men' } })
      fireEvent.change(screen.getByLabelText(/size/i), { target: { value: 'L' } })
    })

    // Submit the form
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add product/i }))
    })

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/service unavailable/i)).toBeInTheDocument()
    })
  })
})
