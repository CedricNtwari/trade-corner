import React, { useEffect, useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults'
import styles from '../../styles/ProductsPage.module.css'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosRes.get('/products/')
        setProducts(response.data.results)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading products...</p>
  if (error) return <p>{error}</p>

  return (
    <div className={styles.ProductsPage}>
      <h1>Products</h1>
      <div className={styles.ProductGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.ProductItem}>
            <img src={product.image} alt={product.name} className={styles.ProductImage} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>In stock: {product.stock}</p>
            {/* Add more product details */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
