import React from 'react'
import styles from '../styles/PhilosophySection.module.css'

const PhilosophySection = () => {
  return (
    <section className={styles.philosophySection}>
      <h3 className={styles.title}>Our Philosophy</h3>
      <p className={styles.description}>
        We at Trade Corner want to set an example for the environment and stop the throwaway
        madness. By reusing items, we consume more intelligently and thus make our contribution to
        the fight against climate change.
      </p>
      <p className={styles.extraInfo}>
        Secondhand from Switzerland for a better world!
        <br />
        #Secondhand #SecondhandinSwitzerland #SafethePlanet
      </p>
    </section>
  )
}

export default PhilosophySection
