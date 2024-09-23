import React from 'react'
import { Container } from 'react-bootstrap'

const TermsConditions = () => {
  return (
    <Container>
      <h1 className="text-center pb-3">General Terms and Conditions</h1>
      <p>
        General Terms and Conditions for orders placed via www.hand2hand.ch. These terms apply to
        all orders placed and contracts concluded via the online shop.
      </p>
      <h3>Order, Price, and Payments</h3>
      <p>
        The offer is valid while stocks last. Payments are accepted in Swiss Francs and Euro. By
        completing the purchase process, the order is binding and confirmed immediately by e-mail.
      </p>

      <h3>Delivery</h3>
      <p>We deliver to Switzerland, Germany, Lichtenstein, Austria, France, and Italy.</p>

      <h3>Guarantee and Liability</h3>
      <p>We exclude all guarantees. Liability starts upon delivery.</p>
    </Container>
  )
}

export default TermsConditions
