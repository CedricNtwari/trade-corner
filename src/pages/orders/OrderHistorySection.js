import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../../styles/OrderPage.module.css'
import LoadingSpinner from '../../components/LoadingSpinner'
import OrdersList from './OrdersList'

const OrderHistorySection = ({ userId }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/order-history/')
        setOrders(response.data.results)
      } catch (err) {
        setError('Failed to load order history.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  if (loading) return <LoadingSpinner message="Loading order history..." />
  if (error) return <p>{error}</p>

  return (
    <div className={styles.OrderHistorySection}>
      <h2>Your Orders</h2>
      <OrdersList orders={orders} />
    </div>
  )
}

export default OrderHistorySection
