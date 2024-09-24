import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../../styles/SignInUpForm.module.css'

const PrivacyPolicy = () => {
  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}>Privacy Policy</h1>

      <p className={styles.Paragraph}>
        The responsible body within the meaning of the data protection laws is:
        <br />
        Trade Corner
        <br />
        Seestrasse 80, 8806 SZ, Switzerland
      </p>

      <h3 className={styles.SubHeader}>General Note</h3>
      <p className={styles.Paragraph}>
        We take the protection of your personal data seriously. Data transmission over the internet
        (e.g., email communication) can have security gaps.
      </p>

      <h3 className={styles.SubHeader}>Processing of Personal Data</h3>
      <p className={styles.Paragraph}>
        Personal data includes all information that relates to an identified or identifiable person.
      </p>
    </Container>
  )
}

export default PrivacyPolicy
