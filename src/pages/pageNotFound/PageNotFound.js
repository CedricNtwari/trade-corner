import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/SignInUpForm.module.css'

const PageNotFound = () => {
  const history = useHistory()

  const handleGoHome = () => {
    history.push('/')
  }

  const handleContinueShopping = () => {
    history.push('/products')
  }

  return (
    <div className={styles.NotFoundWrapper}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist or may have been moved.</p>
      <div className={styles.ButtonGroup}>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
        <Button className={`${btnStyles.Button} ${btnStyles.Darker}`} onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}

export default PageNotFound
