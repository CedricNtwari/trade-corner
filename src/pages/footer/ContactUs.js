import React, { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import styles from '../../styles/SignInUpForm.module.css'
import btnStyles from '../../styles/Button.module.css'

function ContactUs() {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const { name, email, message } = contactData
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/contact-us/', contactData) // Removed the 'data' variable
      setSuccessMessage('Your message has been sent successfully!')
      setContactData({
        name: '',
        email: '',
        message: '',
      })
      setErrors({})
    } catch (err) {
      setErrors(err.response?.data)
      setSuccessMessage('')
    }
  }

  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Row className={styles.Row}>
      <Col lg={6} className={`d-none d-lg-block ${styles.ImageCol}`}>
        <img
          src="https://res.cloudinary.com/dexabr21b/image/upload/v1727363701/StockCake-Contact_Us_Button_1727363631_rk8cxc.jpg"
          alt="Sign in illustration"
          className={styles.SideImage}
        />
      </Col>
      <Col>
        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            {successMessage}
          </Alert>
        )}
        <Container>
          <h1 className={styles.Header}>Contact Us</h1>
          <p>
            Fields marked with an <span className={styles.Span}>*</span> are required
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className={styles.TextInput}>
              <Form.Control
                type="text"
                placeholder=" "
                name="name"
                className={styles.Input}
                value={name}
                onChange={handleChange}
              />
              <Form.Label>
                Name<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.name?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="email" className={styles.TextInput}>
              <Form.Control
                type="email"
                placeholder=" "
                name="email"
                className={styles.Input}
                value={email}
                onChange={handleChange}
              />
              <Form.Label>
                Email<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.email?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Form.Group controlId="message" className={styles.TextInput}>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder=" "
                name="message"
                className={styles.Input}
                value={message}
                onChange={handleChange}
              />
              <Form.Label>
                Message<span className={styles.Span}> *</span>
              </Form.Label>
            </Form.Group>
            {errors.message?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
              type="submit"
            >
              Send Message
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  )
}

export default ContactUs
