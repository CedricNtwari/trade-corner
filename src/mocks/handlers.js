// src/mocks/handlers.js
import { rest } from 'msw'

const baseURL = 'https://ecommerce-backend-api-1-abe8f24df824.herokuapp.com/'

export const handlers = [
  // Mocking user GET request
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

  // Mocking logout POST request
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200))
  }),

  // Mocking successful login POST request
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

  // Product handlers
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

  // Validation errors for products
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
]
