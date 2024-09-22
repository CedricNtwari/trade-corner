import React from 'react'
import styles from '../styles/SellSection.module.css'

const SellSection = () => {
  return (
    <section className={styles.sellSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src="https://res.cloudinary.com/dexabr21b/image/upload/v1727024001/clothes-overwhelm-man-stockcake_ntilqj.webp"
            alt="Clothing rack"
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <h3 className={styles.title}>Sell your clothes now!</h3>
          <p className={styles.subTitle}>
            Sell your second-hand items yourself directly on the largest online flea market in
            Switzerland. Simply list your items yourself and profit. The unique online flea market
            in your hand.
          </p>
          <a href="/products" className={styles.link}>
            Find out more here!
          </a>
        </div>
      </div>
    </section>
  )
}

export default SellSection
