import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import ProfilePage from '../ProfilePage'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const baseURL = 'https://ecommerce-backend-api-1-abe8f24df824.herokuapp.com/'

// Set up the mock server with the required handlers
const server = setupServer(
  rest.get(`${baseURL}profiles/:id/`, (req, res, ctx) => {
    const { id } = req.params
    if (id === '4') {
      return res(
        ctx.json({
          id: 4,
          username: 'cedri',
          products: [],
        }),
      )
    }
    return res(ctx.status(404), ctx.json({ message: 'Profile not found' }))
  }),
)

// Start and stop the server
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '4' }), // Mock profile id as '4'
}))

describe('ProfilePage', () => {
  const renderProfilePage = () => {
    render(
      <Router>
        <ProfilePage />
      </Router>,
    )
  }

  it('renders loading spinner initially', () => {
    renderProfilePage()
    expect(screen.getByText(/Loading profile.../i)).toBeInTheDocument()
  })

  /*   it('renders profile data after successful fetch', async () => {
    renderProfilePage()

    await waitFor(() => {
      expect(screen.getByText('cedri')).toBeInTheDocument() // Verify username
      expect(screen.getByText(/Profile Details/i)).toBeInTheDocument()
      expect(screen.getByText(/Order History/i)).toBeInTheDocument()
    })
  }) */

  it('shows an error message if the profile is not found', async () => {
    // Change server behavior to return 404 for profile 999
    server.use(
      rest.get(`${baseURL}profiles/999/`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ message: 'Profile not found' }))
      }),
    )

    renderProfilePage()

    await waitFor(() => {
      expect(screen.getByText('Profile not found')).toBeInTheDocument()
    })
  })
})
