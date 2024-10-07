import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styles from '../styles/CategoriesSection.module.css'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CategoriesSection = () => {
  return (
    <div className={styles.CategoriesSection}>
      <h3 className={styles.categoryTitle}>Shop by category</h3>
      <Row className="text-center">
        <Col xs={12} md={4} className={styles.categoryCol}>
          <Link
            to="/products?category=women"
            className={styles.imageWrapper}
            data-testid="category-link-women"
          >
            <img
              src="https://res.cloudinary.com/dexabr21b/image/upload/v1727034804/StockCake-Shopping_clothes_together_1727034795_rxjisp.jpg"
              alt="Shoes"
              className={styles.categoryImage}
              data-testid="category-image-women"
            />
            <div className={styles.overlay}>
              <h3 className={styles.categoryTitle}>Women</h3>
              <FaArrowRight className={styles.arrowIcon} />
            </div>
          </Link>
        </Col>
        <Col xs={12} md={4} className={styles.categoryCol}>
          <Link
            to="/products?category=men"
            className={styles.imageWrapper}
            data-testid="category-link-men"
          >
            <img
              src="https://res.cloudinary.com/dexabr21b/image/upload/v1727034587/StockCake-Browsing_Clothing_Stall_1727034574_sypsgu.jpg"
              alt="Apparel"
              className={styles.categoryImage}
              data-testid="category-image-men"
            />
            <div className={styles.overlay}>
              <h3 className={styles.categoryTitle}>Men</h3>
              <FaArrowRight className={styles.arrowIcon} />
            </div>
          </Link>
        </Col>
        <Col xs={12} md={4} className={styles.categoryCol}>
          <Link
            to="/products?category=kids"
            className={styles.imageWrapper}
            data-testid="category-link-kids"
          >
            <img
              src="https://res.cloudinary.com/dexabr21b/image/upload/v1727034623/StockCake-Creative_Kid_Painting_1727034611_mp7qsb.jpg"
              alt="Accessories"
              className={styles.categoryImage}
              data-testid="category-image-kids"
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
