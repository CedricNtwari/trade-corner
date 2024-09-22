import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { FaTruck, FaTag, FaGift, FaStar } from 'react-icons/fa'
import styles from '../styles/InfoFeaturesSection.module.css'

const InfoFeaturesSection = () => {
  return (
    <div className={styles.infoSection}>
      <Row className="text-center">
        <Col xs={6} md={3} className={styles.featureCol}>
          <FaTruck className={styles.icon} />
          <p>Free Shipping</p>
        </Col>
        <Col xs={6} md={3} className={styles.featureCol}>
          <FaTag className={styles.icon} />
          <p>Become a salesperson yourself</p>
        </Col>
        <Col xs={6} md={3} className={styles.featureCol}>
          <FaGift className={styles.icon} />
          <p>Give something back to the environment</p>
        </Col>
        <Col xs={6} md={3} className={styles.featureCol}>
          <FaStar className={styles.icon} />
          <p>Largest online flea market</p>
        </Col>
      </Row>
    </div>
  )
}

export default InfoFeaturesSection
