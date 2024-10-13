import { useHistory } from 'react-router-dom'
import axios from 'axios'
import styles from '../../styles/ProfilePage.module.css'
import btnStyles from '../../styles/Button.module.css'

const UserProducts = ({ products }) => {
  const history = useHistory()

  const handleEdit = (product) => {
    history.push(`/products/edit/${product.id}`, { product })
  }

  const handleDelete = async (productId) => {
    if (
      window.confirm('Are you sure you want to delete this product? This action is not reversible.')
    ) {
      try {
        await axios.delete(`/products/${productId}/`)
        window.location.reload()
      } catch (err) {
        //console.error('Error deleting product:', err)
      }
    }
  }

  return (
    <div className={`p-4 ${styles.ProductsSection}`}>
      <h2>My Products</h2>
      <div className={styles.ProductGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.ProductItem}>
            <img src={product.image} alt={product.name} className={styles.ProductImage} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button
              className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>
            <button
              className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserProducts
