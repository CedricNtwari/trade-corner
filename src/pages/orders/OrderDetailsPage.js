import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/OrderPage.module.css'

const OrderDetailsPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/orders/${id}`)
        setOrder(response.data)
      } catch (error) {
        console.error('Error fetching order details', error)
      }
    }

    fetchOrderDetails()
  }, [id])

  if (!order) {
    return <p>Loading order details...</p>
  }

  const handleContinueShopping = () => {
    history.push('/products')
  }

  const handleViewInvoice = () => {
    if (order.invoice_url) {
      window.open(order.invoice_url, '_blank')
    } else {
      alert('Invoice not available')
    }
  }

  return (
    <div className={styles.OrderDetailsPage}>
      <div className={styles.CheckoutWrapper}>
        <h1 className={styles.Header}>Order Details</h1>
        <p>
          <strong>Order Number:</strong> {order.order_number}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> USD {parseFloat(order.total_price).toFixed(2)}
        </p>

        <h3 className={styles.Header}>Items in this Order:</h3>
        <ul className={styles.OrderItemsList}>
          {order.items.map((item) => (
            <li key={item.id} className={styles.OrderItem}>
              <img
                src={item.product.image || '/path-to-default-image.jpg'}
                alt={item.product.name || 'Product'}
                className={styles.OrderItemImage}
              />
              <div className={styles.OrderItemDetails}>
                <p>{item.product.name || 'Product Name'}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: USD {parseFloat(item.price).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.ButtonGroup}>
          <button
            className={`${btnStyles.Button} ${btnStyles.Darker}`}
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
          <button className={`${btnStyles.Button} ${btnStyles.Bright}`} onClick={handleViewInvoice}>
            View Invoice
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
