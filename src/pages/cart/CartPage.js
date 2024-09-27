import { useCart, useSetCart } from '../../contexts/CartContext'
import styles from '../../styles/CartPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const CartPage = () => {
  const { cart } = useCart()
  const { removeFromCart, updateQuantity, alertMessage } = useSetCart()
  const history = useHistory()

  const handleQuantityChange = (itemId, stock, newQuantity) => {
    const validQuantity = Math.min(newQuantity, stock)
    updateQuantity(itemId, validQuantity, stock)
  }

  const handleProductClick = (productId) => {
    history.push(`/products/${productId}`)
  }

  if (!cart || cart.items.length === 0) {
    return <h1 className={styles.EmptyCart}>Your Cart is Empty</h1>
  }

  return (
    <div className={styles.CartPage}>
      <h1>Shopping Cart</h1>
      {cart.items.map((item) => (
        <div className={styles.CartItem} key={item.id}>
          <div
            className={styles.CartItemClickable}
            onClick={() => handleProductClick(item.product.id)}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className={styles.CartItemImage}
            />
            <div className={styles.CartItemDetails}>
              <p className={styles.CartItemName}>{item.product.name}</p>
              <p>USD {item.product.price}</p>
            </div>
          </div>
          <div>
            <label htmlFor={`qty-${item.id}`}>Qty:</label>
            <input
              type="number"
              id={`qty-${item.id}`}
              value={item.quantity}
              min="1"
              max={item.product.stock}
              onChange={(e) =>
                handleQuantityChange(item.id, item.product.stock, parseInt(e.target.value))
              }
            />
          </div>
          <div className={styles.CartItemPrice}>USD {item.product.price * item.quantity}</div>
          <button
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className={styles.CartSummary}>
        <p>Subtotal: USD {cart.total.toFixed(2)}</p>
        <button className={`${btnStyles.Button} ${btnStyles.Darker}`}>Checkout</button>
      </div>

      {alertMessage && (
        <Alert variant={alertMessage.type === 'error' ? 'danger' : 'success'}>
          {alertMessage.message}
        </Alert>
      )}
    </div>
  )
}

export default CartPage
