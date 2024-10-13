import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from '../../styles/SignInUpForm.module.css'
import btnStyles from '../../styles/Button.module.css'

import { Form, Button, Col, Row, Container, Alert } from 'react-bootstrap'
import axios from 'axios'

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
  })
  const { username, password1, password2 } = signUpData

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const history = useHistory()

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData)
      setSuccess(true)
      setErrors({})
      setTimeout(() => {
        history.push('/signin')
      }, 3000)
    } catch (err) {
      if (err.response) {
        //console.error('Error response:', err.response.data)
        setErrors(err.response.data)
      } else if (err.request) {
        //console.error('Error request:', err.request)
        setErrors({
          non_field_errors: ['Network error. Please check your connection or try again later.'],
        })
      } else {
        //console.error('Error message:', err.message)
        setErrors({ non_field_errors: ['An unexpected error occurred.'] })
      }
    }
  }

  return (
    <Row className={styles.Row}>
      <Col lg={6} className={`d-none d-lg-block ${styles.ImageCol}`}>
        <img
          src="https://res.cloudinary.com/dexabr21b/image/upload/v1727363734/StockCake-Bustling_Flea_Market_1727363721_p0uvoo.jpg"
          alt="Sign in illustration"
          className={styles.SideImage}
        />
      </Col>
      <Col>
        <Container>
          <h1 className={styles.Header}>sign up</h1>
          <p>
            Fields marked with an <span className={styles.Span}>*</span> are required
          </p>
          {success && (
            <Alert variant="success">
              Registration successful! You will be redirected to the sign-in page shortly.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className={styles.TextInput}>
              <Form.Control
                className={styles.Input}
                type="text"
                name="username"
                value={username}
                required
                placeholder=" "
                onChange={handleChange}
                data-testid="username-input"
              />
              <Form.Label>
                Username<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1" className={styles.TextInput}>
              <Form.Control
                className={styles.Input}
                type="password"
                name="password1"
                value={password1}
                required
                placeholder=" "
                onChange={handleChange}
                data-testid="password1-input"
              />
              <Form.Label>
                Password<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password2" className={styles.TextInput}>
              <Form.Control
                className={styles.Input}
                type="password"
                name="password2"
                value={password2}
                required
                placeholder=" "
                onChange={handleChange}
                data-testid="password2-input"
              />
              <Form.Label>
                Confirm password<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Sign up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  )
}

export default SignUpForm
