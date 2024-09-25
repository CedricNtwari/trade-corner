import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axiosRes } from '../../api/axiosDefaults'
import styles from '../../styles/ProductsPage.module.css'
import btnStyles from '../../styles/Button.module.css'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const history = useHistory()

  const fetchProducts = async (category) => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = category === 'all' ? '/products/' : `/products/?category=${category}`
      const response = await axiosRes.get(endpoint)
      setProducts(response.data.results)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(selectedCategory)
  }, [selectedCategory])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    fetchProducts(category)
  }

  const handleProductClick = (productId) => {
    history.push(`/products/${productId}`)
  }

  if (loading) return <p>Loading products...</p>
  if (error) return <p>{error}</p>

  return (
    <div className={styles.ProductsPage}>
      <h1 className={styles.Header}>Products</h1>

      <div className={styles.CategoryFilters}>
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={() => handleCategoryChange('all')}
        >
          All
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={() => handleCategoryChange('women')}
        >
          Women
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={() => handleCategoryChange('men')}
        >
          Men
        </button>
        <button
          className={`${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={() => handleCategoryChange('kids')}
        >
          Kids
        </button>
      </div>

      <div className={styles.ProductGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className={styles.ProductItem}
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} className={styles.ProductImage} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <p>In stock: {product.stock}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
