import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import btnStyles from '../styles/Button.module.css'
import modalStyles from '../styles/Modal.module.css'

const FirstLoadModal = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const firstLoad = localStorage.getItem('firstLoad')
    if (!firstLoad) {
      setShowModal(true)
      localStorage.setItem('firstLoad', true)

      setTimeout(() => {
        setShowModal(false)
      }, 3000)
    }
  }, [])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <Modal show={showModal} onHide={handleClose} dialogClassName={modalStyles.centeredModal}>
      <Modal.Header>
        <Modal.Title>Special Offer!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Free Shipping on Orders Above 100 USD</h4>
        <p>
          Don&apos;t miss out on this exclusive offer. Shop now and get free shipping when you spend
          100 USD or more.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FirstLoadModal
