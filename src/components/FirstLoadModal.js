import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import btnStyles from '../styles/Button.module.css'

const FirstLoadModal = () => {
  const [showModal, setShowModal] = useState(false)

  // Check if this is the first load
  useEffect(() => {
    const firstLoad = localStorage.getItem('firstLoad')
    if (!firstLoad) {
      setShowModal(true)
      localStorage.setItem('firstLoad', true)
    }
  }, [])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Special Offer!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Free Shipping on Orders Above 100 CHF</h4>
        <p>
          Don't miss out on this exclusive offer. Shop now and get free shipping when you spend 100
          CHF or more.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} onClick={handleClose}>
          Start Shopping
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FirstLoadModal
