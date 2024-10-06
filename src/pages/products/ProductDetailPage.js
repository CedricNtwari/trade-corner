import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import styles from '../../styles/ProductDetailPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import { useCart, useSetCart } from '../../contexts/CartContext'
import { Alert } from 'react-bootstrap'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const ProductDetailPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart, alertMessage } = useSetCart()
  const { cart } = useCart()
  const currentUser = useCurrentUser()

  const existingCartItem = cart?.items.find((item) => item.product.id === product?.id)
  const disableAddToCart = existingCartItem && existingCartItem.quantity >= product?.stock

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRes = await axios.get(`/products/${id}/`)
        setProduct(productRes.data)
        const relatedRes = await axios.get(`/products/?category=${productRes.data.category}`)
        setRelatedProducts(relatedRes.data.results)
      } catch (err) {
        setError('Failed to fetch product details')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!currentUser) {
      alert('Please log in to add products to your cart.')
      history.push('/signin')
      return
    }
    if (product.stock > 0) {
      addToCart(product.id, product.stock)
    }
  }

  const handleProductClick = (productId) => {
    history.push(`/products/${productId}`)
  }

  if (loading) {
    return <LoadingSpinner message="Loading product details..." />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className={styles.ProductDetailPage}>
      {product && (
        <>
          <div className={styles.ProductWrapper}>
            <div className={styles.ImageContainer}>
              <img
                src={product.image || 'default-image.jpg'}
                alt={product.name}
                className={styles.ProductImage}
              />
            </div>
            <div className={styles.ProductDetails}>
              <h1>{product.name}</h1>
              <div className={styles.PriceSection}>
                <span className={styles.CurrentPrice}>
                  USD {product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                </span>
              </div>
              <p>{product.description}</p>
              <p>Seller: {product.owner}</p>
              {product.stock > 0 ? (
                <p>In stock: {product.stock}</p>
              ) : (
                <p className={styles.OutOfStock}>Out of Stock</p>
              )}
              <div>
                <button
                  className={`btn ${btnStyles.Button} ${
                    product.stock > 0 ? btnStyles.Bright : btnStyles.Disabled
                  }`}
                  onClick={handleAddToCart}
                  disabled={disableAddToCart || product.stock <= 0}
                >
                  {disableAddToCart
                    ? 'Max stock in cart'
                    : product.stock > 0
                    ? 'Add to Cart'
                    : 'Out of Stock'}
                </button>
              </div>
              {alertMessage && (
                <Alert variant={alertMessage.type === 'error' ? 'danger' : 'success'}>
                  {alertMessage.message}
                </Alert>
              )}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className={styles.RelatedProducts}>
              <h2>You might also like</h2>
              <div className={styles.RelatedGrid}>
                {relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className={styles.RelatedItem}
                    onClick={() => handleProductClick(relatedProduct.id)}
                  >
                    <img
                      src={relatedProduct.image || 'default-image.jpg'}
                      alt={relatedProduct.name}
                      className={styles.ProductImage}
                    />
                    <p>{relatedProduct.name}</p>
                    <p>USD {parseFloat(relatedProduct.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductDetailPage
