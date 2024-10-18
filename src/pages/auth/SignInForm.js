import React, { useState } from 'react'
import axios from 'axios'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import { Link, useHistory } from 'react-router-dom'

import styles from '../../styles/SignInUpForm.module.css'
import btnStyles from '../../styles/Button.module.css'
import { useSetCurrentUser } from '../../contexts/CurrentUserContext.js'
import { useSetCart } from '../../contexts/CartContext.js'
import { setTokenTimestamp } from '../../utils/utils'

function SignInForm() {
  const setCurrentUser = useSetCurrentUser()
  const { fetchCart } = useSetCart()

  const [signInData, setSignInData] = useState({
    username: '',
    password: '',
  })
  const { username, password } = signInData

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await axios.post('/dj-rest-auth/login/', signInData)
      setCurrentUser(data.user)
      setTokenTimestamp(data)
      await fetchCart()
      setSuccessMessage('You have successfully signed in!')
      setTimeout(() => {
        history.push('/')
      }, 2000)
    } catch (err) {
      setErrors(err.response?.data)
      setSuccessMessage('')
    }
  }

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Row className={styles.Row}>
      <Col lg={6} className={`d-none d-lg-block ${styles.ImageCol}`}>
        <img
          src="https://res.cloudinary.com/dexabr21b/image/upload/v1727363682/StockCake-Bustling_Thrift_Shop_1727363668_faapl5.jpg"
          alt="Sign in illustration"
          className={styles.SideImage}
        />
      </Col>
      <Col lg={6} className={styles.FormCol}>
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>
        )}
        <Container>
          <h1 className={styles.Header}>Sign In</h1>
          <p>
            Fields marked with an <span className={styles.Span}>*</span> are required
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className={styles.TextInput}>
              <Form.Control
                type="text"
                placeholder=" "
                name="username"
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
              <Form.Label>
                Username<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password" className={styles.TextInput}>
              <Form.Control
                type="password"
                placeholder=" "
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
              <Form.Label>
                Password<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container>
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  )
}

export default SignInForm
