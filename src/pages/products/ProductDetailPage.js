import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import styles from '../../styles/ProductDetailPage.module.css'
import btnStyles from '../../styles/Button.module.css'

const ProductDetailPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const handleProductClick = (productId) => {
    history.push(`/products/${productId}`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

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
                  CHF {product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                </span>
                {product.original_price && (
                  <span className={styles.OriginalPrice}>
                    CHF {parseFloat(product.original_price).toFixed(2)}
                  </span>
                )}
              </div>
              <p>{product.description}</p>
              <p>Seller: {product.owner}</p>
              <p>In stock: {product.stock}</p>
              <div>
                <button className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}>
                  Add to Cart
                </button>
              </div>
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
                    <p>CHF {parseFloat(relatedProduct.price).toFixed(2)}</p>
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
