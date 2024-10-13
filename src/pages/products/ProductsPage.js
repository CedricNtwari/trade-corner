import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axiosRes } from '../../api/axiosDefaults'
import styles from '../../styles/ProductsPage.module.css'
import btnStyles from '../../styles/Button.module.css'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const productsPerPage = 6
  const history = useHistory()
  const currentUser = useCurrentUser()

  const fetchProducts = async (category, page = 1) => {
    setLoading(true)
    setError(null)
    try {
      const endpoint =
        category === 'all'
          ? `/products/?page=${page}&page_size=${productsPerPage}`
          : `/products/?category=${category}&page=${page}&page_size=${productsPerPage}`
      const response = await axiosRes.get(endpoint)

      if (page === 1) {
        setProducts(response.data.results)
      } else {
        setProducts((prevProducts) => [...prevProducts, ...response.data.results])
      }

      setHasMore(response.data.next !== null)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(
    () => {
      setCurrentPage(1)
      fetchProducts(selectedCategory)
    },
    [selectedCategory],
    currentUser,
  )

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  const handleProductClick = (productId) => {
    history.push(`/products/${productId}`)
  }

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchProducts(selectedCategory, nextPage)
  }

  if (loading && currentPage === 1) {
    return <LoadingSpinner message="Loading products..." />
  }

  if (error) {
    return <p>{error}</p>
  }

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
              <h2 className={styles.ProductName}>{product.name}</h2>
              <div className={styles.ProductCategory}>{product.category.toUpperCase()}</div>
              <p className={styles.ProductDescription}>{product.description}</p>
              <div className={styles.ProductPrice}>${product.price}</div>
              <div className={styles.ProductStock}>In stock: {product.stock}</div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      {hasMore && (
        <div className={styles.LoadMoreSection}>
          <button
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
            onClick={loadMoreProducts}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
