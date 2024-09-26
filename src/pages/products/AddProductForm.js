import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

import styles from '../../styles/SignInUpForm.module.css'
import btnStyles from '../../styles/Button.module.css'

const AddProductForm = () => {
  const { id } = useParams()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    size: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    image: null,
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState({})
  const history = useHistory()

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`/products/${id}/`)
          setProductData(data)
        } catch (err) {
          console.error('Failed to load product', err)
        }
      }
      fetchProduct()
    }
  }, [id])

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('name', productData.name)
    formData.append('description', productData.description)
    formData.append('price', productData.price)
    formData.append('stock', productData.stock)
    formData.append('category', productData.category)
    formData.append('size', productData.size)
    formData.append('street_address', productData.street_address)
    formData.append('city', productData.city)
    formData.append('state', productData.state)
    formData.append('postal_code', productData.postal_code)

    if (productData.image) {
      formData.append('image', productData.image)
    }

    try {
      if (id) {
        await axios.put(`/products/${id}/`, formData)
      } else {
        await axios.post('/products/', formData)
        setSuccessMessage('Product created successfully!')
      }
      setTimeout(() => {
        setSuccessMessage('')
        history.push('/products')
      }, 3000)
    } catch (err) {
      setErrors(err.response?.data || {})
    }
  }

  return (
    <Container className="mt-5">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className={styles.Header}>{id ? 'Edit Product' : 'Add a Product'}</h2>

          <Form onSubmit={handleSubmit} className={styles.Form}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  />
                  {errors.name?.map((message, idx) => (
                    <div key={idx} className={styles.ErrorMessage}>
                      {message}
                    </div>
                  ))}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  />
                  {errors.price?.map((message, idx) => (
                    <div key={idx} className={styles.ErrorMessage}>
                      {message}
                    </div>
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="stock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter stock"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  />
                  {errors.stock?.map((message, idx) => (
                    <div key={idx} className={styles.ErrorMessage}>
                      {message}
                    </div>
                  ))}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    as="select"
                    name="size"
                    value={productData.size}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="image">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className={styles.Input}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <h3 className={styles.Header}>Address Information</h3>

            <Row>
              <Col md={6}>
                <Form.Group controlId="street_address">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter street address"
                    name="street_address"
                    value={productData.street_address}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={productData.city}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state"
                    name="state"
                    value={productData.state}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="postal_code">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter postal code"
                    name="postal_code"
                    value={productData.postal_code}
                    onChange={handleChange}
                    className={styles.Input}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} mb-5`}
              type="submit"
            >
              {id ? 'Update Product' : 'Add Product'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default AddProductForm
