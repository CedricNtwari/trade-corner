// LoadingSpinner.js
import React from 'react'
import styles from '../styles/LoadingSpinner.module.css'

const LoadingSpinner = ({ message }) => {
  return (
    <div className={styles.LoadingOverlay}>
      <div className={styles.Spinner}></div>
      {message && <p>{message}</p>}
    </div>
  )
}

export default LoadingSpinner