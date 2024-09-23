import React from 'react'
import { Container } from 'react-bootstrap'

const FAQ = () => {
  return (
    <Container>
      <h1 className="text-center pb-3">FAQ</h1>
      <h3>Who are you?</h3>
      <p>We are Hand2Hand, the Swiss online store for vintage clothing.</p>

      <h3>I have problems with my order, what can I do?</h3>
      <p>
        Please send us an e-mail to support@hand2hand.ch and we will answer you as soon as possible.
        Or write us directly via Instagram or Facebook.
      </p>

      <h3>What kind of condition are your items?</h3>
      <p>
        Second-hand items usually show some signs of wear. Most articles are of very good quality.
        Our quality rating:
        <br />
        Very good - 9/10; no or hardly recognizable defects
        <br />
        Good - 8/10; slight defects or signs of wear and tear
        <br />
        Signs of wear, look at the pictures carefully; defects are present, please have a close look
        at the pictures
      </p>

      <h3>How do you size your items?</h3>
      <p>
        In the detailed description of the respective article we indicate the "Label size" and the
        "Fit size".
        <br />
        Label size; is the size, which the manufacturer indicates
        <br />
        Fit size; Here we indicate the size in modern standards
      </p>

      <h3>When will my order be shipped? When will I receive my order?</h3>
      <p>
        All articles are sent by A-Post. The delivery time is normally 2 - 4 working days for
        Switzerland and Lichtenstein, and 4-8 working days for Germany, Austria, and France.
      </p>

      <h3>Can I return my article?</h3>
      <p>
        The clothes can be returned within 30 days of receipt to the following address:
        <br />
        Trade Corner
        <br />
        Postlagernd
        <br />
        Seestrasse 80
        <br />
        8806 SZ
        <br />
        Switzerland
      </p>
    </Container>
  )
}

export default FAQ
