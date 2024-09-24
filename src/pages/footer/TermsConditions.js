import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../../styles/SignInUpForm.module.css'

const TermsConditions = () => {
  return (
    <Container className={styles.Container}>
      <h1 className={styles.Header}>General Terms and Conditions</h1>

      <p className={styles.Paragraph}>
        General Terms and Conditions for orders placed via www.hand2hand.ch. These terms apply to
        all orders placed and contracts concluded via the online shop.
      </p>

      <h3 className={styles.SubHeader}>Order, Price, and Payments</h3>
      <p className={styles.Paragraph}>
        The offer is valid while stocks last. Payments are accepted in Swiss Francs and Euro. By
        completing the purchase process, the order is binding and confirmed immediately by e-mail.
      </p>

      <h3 className={styles.SubHeader}>Delivery</h3>
      <p className={styles.Paragraph}>
        We deliver to Switzerland, Germany, Lichtenstein, Austria, France, and Italy.
      </p>

      <h3 className={styles.SubHeader}>Guarantee and Liability</h3>
      <p className={styles.Paragraph}>We exclude all guarantees. Liability starts upon delivery.</p>
    </Container>
  )
}

export default TermsConditions
