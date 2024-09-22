import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styles from '../styles/CategoriesSection.module.css'
import { FaArrowRight } from 'react-icons/fa' // Importing the arrow icon
import { Link } from 'react-router-dom'

const CategoriesSection = () => {
  return (
    <div className={styles.CategoriesSection}>
      <h3 className={styles.categoryTitle}>Shop by category</h3>
      <Row className="text-center">
        <Col xs={12} md={4} className={styles.categoryCol}>
          <Link to="/products" className={styles.imageWrapper}>
            <img
              src="https://res.cloudinary.com/dexabr21b/image/upload/v1727034804/StockCake-Shopping_clothes_together_1727034795_rxjisp.jpg"
              alt="Shoes"
              className={styles.categoryImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.categoryTitle}>Women</h3>
              <FaArrowRight className={styles.arrowIcon} />
            </div>
          </Link>
        </Col>
        <Col xs={12} md={4} className={styles.categoryCol}>
          <Link to="/products" className={styles.imageWrapper}>
            <img
              src="https://res.cloudinary.com/dexabr21b/image/upload/v1727034587/StockCake-Browsing_Clothing_Stall_1727034574_sypsgu.jpg"
              alt="Apparel"
              className={styles.categoryImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.categoryTitle}>Men</h3>
              <FaArrowRight className={styles.arrowIcon} />
            </div>
          </Link>
        </Col>
        <Col xs={12} md={4} className={styles.categoryCol}>
          <Link to="/products" className={styles.imageWrapper}>
            <img
              src="https://res.cloudinary.com/dexabr21b/image/upload/v1727034623/StockCake-Creative_Kid_Painting_1727034611_mp7qsb.jpg"
              alt="Accessories"
              className={styles.categoryImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.categoryTitle}>Kids</h3>
              <FaArrowRight className={styles.arrowIcon} />
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default CategoriesSection
