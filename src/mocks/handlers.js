import { rest } from 'msw'

const baseURL = 'https://ecommerce-backend-api-1-abe8f24df824.herokuapp.com/'

export const handlers = [
  // User-related endpoints
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 4,
        username: 'cedri',
        email: '',
        first_name: '',
        last_name: '',
        profile_id: 4,
        profile_image:
          'https://res.cloudinary.com/dexabr21b/image/upload/v1/media/../default_profile_xffzir',
      }),
    )
  }),

  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  rest.post(`${baseURL}dj-rest-auth/login/`, (req, res, ctx) => {
    const { username, password } = req.body

    if (username === 'testuser' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          user: {
            pk: 4,
            username: 'testuser',
            email: 'testuser@example.com',
          },
        }),
      )
    }

    return res(
      ctx.status(400),
      ctx.json({
        non_field_errors: ['Unable to log in with provided credentials.'],
      }),
    )
  }),

  // Product-related endpoints
  rest.get(`${baseURL}products/:id/`, (req, res, ctx) => {
    return res(
      ctx.json({
        name: 'Test Product',
        description: 'A test product description',
        price: 100,
        stock: 10,
        category: 'men',
        size: 'M',
        street_address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        postal_code: '12345',
        image: null,
      }),
    )
  }),

  rest.post(`${baseURL}products/`, (req, res, ctx) => {
    return res(ctx.status(201))
  }),

  rest.put(`${baseURL}products/:id/`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  rest.post(`${baseURL}products/`, (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({
        name: ['Product name should contain only letters and spaces.'],
        description: ['Description should be at least 10 characters long.'],
        price: ['Price should be a positive number.'],
      }),
    )
  }),

  // Cart-related endpoints
  rest.get(`${baseURL}cart/`, (req, res, ctx) => {
    return res(
      ctx.json({
        items: [
          {
            id: 1,
            product: {
              id: 1,
              name: 'Test Product',
              price: '10.00',
              image: 'https://example.com/test-product.jpg',
            },
            quantity: 2,
          },
        ],
        total_price: '20.00',
      }),
    )
  }),

  rest.post(`${baseURL}cart/add/`, (req, res, ctx) => {
    const { productId, quantity } = req.body
    return res(
      ctx.status(200),
      ctx.json({
        message: `Added ${quantity} units of product ${productId} to the cart.`,
      }),
    )
  }),

  rest.put(`${baseURL}cart/update/`, (req, res, ctx) => {
    const { productId, quantity } = req.body
    return res(
      ctx.status(200),
      ctx.json({
        message: `Updated product ${productId} quantity to ${quantity} in the cart.`,
      }),
    )
  }),

  rest.delete(`${baseURL}cart/remove/:id/`, (req, res, ctx) => {
    const { id } = req.params
    return res(
      ctx.status(200),
      ctx.json({
        message: `Removed product ${id} from the cart.`,
      }),
    )
  }),

  // Mock profile API request
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
    return res(
      ctx.status(404),
      ctx.json({
        message: 'Profile not found',
      }),
    )
  }),
]
