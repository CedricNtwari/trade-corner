import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const openModal = (content) => {
    setModalContent(content)
    setShowModal(true)
  }

  const closeModal = () => setShowModal(false)

  return (
    <footer className={styles.footer}>
      <Container className={styles.wrapper}>
        <Row>
          <Col xs={12} className="text-center text-md-left">
            <p className={styles.slogan}>A World of Products at Your Fingertips</p>
          </Col>
        </Row>

        <Row className="text-center">
          <Col xs={12} md={4}>
            <h4>Information</h4>
            <ul>
              <li>
                <button onClick={() => openModal('Returns')} className={styles.linkButton}>
                  Returns
                </button>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <button onClick={() => openModal('Shipping')} className={styles.linkButton}>
                  Shipping
                </button>
              </li>
              <li>
                <a href="/sizing">Sizing</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="/imprint">Imprint</a>
              </li>
              <li>
                <a href="/terms-and-conditions">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h4>Contact Us</h4>
            <ul>
              <li>
                <a href="/contact">Contact Form</a>
              </li>
              <li>
                <a href="/newsletter">Newsletter</a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="text-center">
          <Col xs={12}>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="https://www.pinterest.com" aria-label="Pinterest">
                <FaPinterestP />
              </a>
            </div>
            <p className={styles.copyright}>© {currentYear} Trade Corner</p>
          </Col>
        </Row>

        {/* Modal for displaying overlay content */}
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent === 'Returns' && (
              <p>
                The clothes can be returned within 30 days of receipt, as long as we receive the
                item in the same condition in which it was shipped...
              </p>
            )}
            {modalContent === 'Shipping' && (
              <p>
                All articles are sent by A-Post. You will receive the product within 1-3 days...
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </footer>
  )
}

export default Footer
