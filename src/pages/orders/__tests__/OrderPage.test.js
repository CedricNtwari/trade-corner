import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import OrderPage from '../OrderPage'
import { handlers, baseURL } from '../../../mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderOrderPage = () => {
  render(<OrderPage />)
}

describe('OrderPage', () => {
  it('renders loading spinner initially', () => {
    renderOrderPage()
    expect(screen.getByText(/Loading your orders.../i)).toBeInTheDocument()
  })

  /*  it('renders orders after successful fetch', async () => {
    renderOrderPage()

    await waitFor(() => {
      expect(screen.getByText('Your Orders')).toBeInTheDocument()
      expect(screen.getByText('Test Product')).toBeInTheDocument() // Check product name
      expect(screen.getByText('100.00')).toBeInTheDocument() // Check total price
    })
  }) */

  it('shows an error message if the order fetch fails', async () => {
    server.use(
      rest.get(`${baseURL}order-history/`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Failed to load your order history.' }))
      }),
    )

    renderOrderPage()

    await waitFor(() => {
      expect(screen.getByText('Failed to load your order history.')).toBeInTheDocument()
    })
  })
})
