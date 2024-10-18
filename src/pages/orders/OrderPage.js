import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../../styles/OrderPage.module.css'
import LoadingSpinner from '../../components/LoadingSpinner'
import OrdersList from './OrdersList'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const OrderPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const currentUser = useCurrentUser()
  const history = useHistory()

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get('/order-history/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setOrders(response.data.results)
      } catch (err) {
        setError('Failed to load your order history.')
      } finally {
        setLoading(false)
      }
    }

    if (!currentUser) {
      history.push('/signin')
    } else {
      fetchOrders()
    }
  }, [currentUser, history])

  if (loading) return <LoadingSpinner message="Loading your orders..." />
  if (error) return <p>{error}</p>

  return (
    <div className={styles.OrderHistoryPage}>
      <h2>Your Orders</h2>
      <OrdersList orders={orders} />
    </div>
  )
}

export default OrderPage
