import React from 'react'
import { Carousel } from 'react-bootstrap'
import styles from '../styles/HeroBanner.module.css'
import btnStyles from '../styles/Button.module.css'
import { useHistory } from 'react-router-dom'

const HeroBanner = () => {
  const history = useHistory()

  const handleRedirect = () => {
    history.push('/products')
  }
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/dexabr21b/image/upload/q_auto,f_auto/v1727024087/StockCake-Volunteers_Sorting_Clothes_1727024080_g9rr1k.jpg"
          alt="First slide"
        />
        <Carousel.Caption className={styles.caption}>
          <h3>Sell your secondhand clothes</h3>
          <p>Simple, fast and uncomplicated</p>
          <button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            onClick={handleRedirect}
            type="button"
          >
            Shop Now
          </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/dexabr21b/image/upload/q_auto,f_auto/v1727023981/StockCake-Colorful_hanging_clothes_1727023840_eusabp.jpg"
          alt="Second slide"
          loading="lazy"
        />
        <Carousel.Caption className={styles.caption}>
          <h3>Buy second-hand clothes now</h3>
          <p>Check out the latest trends in fashion</p>
          <button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            onClick={handleRedirect}
            type="button"
          >
            Discover Now
          </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/dexabr21b/image/upload/q_auto,f_auto/v1727023975/StockCake-Colorful_Laundry_Day_1727023901_hqdnjs.jpg"
          alt="Third slide"
          loading="lazy"
        />
        <Carousel.Caption className={styles.caption}>
          <h3>Exclusive Discounts</h3>
          <p>Don't miss out on our limited-time offers</p>
          <button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            onClick={handleRedirect}
            type="button"
          >
            Buy Now
          </button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default HeroBanner
