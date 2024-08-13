import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from 'react-icons/fa'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear() // Get the current year

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Row className="d-flex align-items-center">
          <Col xs={12} md={6} className="text-center text-md-left">
            <p className={styles.slogan}>A World of Products at Your Fingertips</p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-right">
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
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <p className={styles.copyright}>© {currentYear} Trade Corner</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
