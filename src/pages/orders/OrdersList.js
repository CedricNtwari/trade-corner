import React from 'react'
import styles from '../../styles/OrderPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import { useHistory } from 'react-router-dom'

const OrdersList = ({ orders }) => {
  const history = useHistory()

  if (orders.length === 0) {
    return <p>No orders found.</p>
  }

  const handleViewDetails = (orderId) => {
    history.push(`/order/${orderId}`)
  }

  return (
    <>
      {orders.map((order) => {
        const productName = order.items[0]?.product?.name
        const productImage = order.items[0]?.product?.image

        return (
          <div key={order.id} className={styles.OrderCard}>
            <img src={productImage} alt={productName || 'Product'} className={styles.OrderImage} />
            <div className={styles.OrderDetails}>
              <p>Order Number: {order.order_number}</p>
              <p>Order Date: {new Date(order.created_at).toLocaleDateString()}</p>
              <h3>{productName || 'Product Name'}</h3>
              <p>Status: {order.status}</p>
              <p>Total: USD {parseFloat(order.total_price).toFixed(2)}</p>
              <button
                className={`${btnStyles.Button} ${btnStyles.Darker}`}
                onClick={() => handleViewDetails(order.id)}
              >
                View Details
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default OrdersList
