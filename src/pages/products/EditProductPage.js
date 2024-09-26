import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import styles from '../../styles/Form.module.css'
import btnStyles from '../../styles/Button.module.css'

const EditProductPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    size: '',
    image: null,
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (location.state?.product) {
      setProductData(location.state.product)
    } else {
      axios
        .get(`/products/${id}/`)
        .then((response) => setProductData(response.data))
        .catch((err) => console.error('Error fetching product data:', err))
    }
  }, [id, location.state])

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'image') {
      setProductData((prevData) => ({
        ...prevData,
        image: files[0],
      }))
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage('')

    const formData = new FormData()
    formData.append('name', productData.name)
    formData.append('description', productData.description)
    formData.append('price', productData.price)
    formData.append('stock', productData.stock)
    formData.append('category', productData.category)
    formData.append('size', productData.size)

    if (productData.image) {
      formData.append('image', productData.image)
    }

    axios
      .put(`/products/${id}/`, formData)
      .then((response) => {
        console.log('Product updated:', response.data)
        setSuccessMessage('Product updated successfully!')
        setTimeout(() => history.push('/profile'), 2000)
      })
      .catch((err) => {
        if (err.response?.data) {
          setErrors(err.response.data)
        } else {
          console.error('Error updating product:', err)
        }
      })
  }

  const handleCancel = () => {
    history.push('/profile')
  }

  return (
    <div className={styles.EditProductPage}>
      <h1>Edit Product</h1>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage} Redirecting to profile...
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors.name && <div className="alert alert-danger">{errors.name[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="form-control"
          />
          {errors.description && <div className="alert alert-danger">{errors.description[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="form-control"
          />
          {errors.price && <div className="alert alert-danger">{errors.price[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="form-control"
          />
          {errors.stock && <div className="alert alert-danger">{errors.stock[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
          {errors.category && <div className="alert alert-danger">{errors.category[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="size" className="form-label">
            Size
          </label>
          <select
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          {errors.size && <div className="alert alert-danger">{errors.size[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="form-control"
            accept="image/*"
          />
          {errors.image && <div className="alert alert-danger">{errors.image[0]}</div>}
        </div>

        <button type="submit" className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}>
          Save Changes
        </button>

        <button
          type="button"
          className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditProductPage
