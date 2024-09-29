import React from 'react'
import styles from '../../styles/OrderPage.module.css'
import btnStyles from '../../styles/Button.module.css'

const OrdersList = ({ orders }) => {
  if (orders.length === 0) {
    return <p>No orders found.</p>
  }

  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className={styles.OrderCard}>
          <img
            src={order.profile.products[0]?.image || 'default-image.jpg'}
            alt={order.profile.products[0]?.name || 'Product'}
            className={styles.OrderImage}
          />
          <div className={styles.OrderDetails}>
            <p>Order date: {new Date(order.created_at).toLocaleDateString()}</p>
            <h3>{order.profile.products[0]?.name || 'Product Name'}</h3>
            <p>Status: {order.status}</p>
            <p>Total: USD {parseFloat(order.total_price).toFixed(2)}</p>
            <button className={`${btnStyles.Button} ${btnStyles.Darker}`}>View Details</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default OrdersList
