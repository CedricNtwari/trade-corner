import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from '../../styles/ProfilePage.module.css'
import btnStyles from '../../styles/Button.module.css'

const ProfilePage = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone_number: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}/`)
        setProfile(data)
        setFormData({
          name: data.name || '',
          street_address: data.street_address || '',
          city: data.city || '',
          state: data.state || '',
          postal_code: data.postal_code || '',
          country: data.country || '',
          phone_number: data.phone_number || '',
        })
      } catch (err) {
        setError('Profile not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // Clear previous errors
    try {
      const response = await axios.put(`/profiles/${id}/`, formData)
      console.log('Profile updated successfully:', response.data)
      setProfile(response.data)
      setIsEditing(false) // Close the form after successful save
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data) // Set error messages from the API
        console.error('Error response:', err.response.data)
      } else {
        console.error('Error:', err.message)
      }
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  if (loading) return <p>Loading profile...</p>
  if (error) return <p>{error}</p>

  return (
    <div className={styles.ProfilePage}>
      {/* Profile Header */}
      <div className={`p-4 ${styles.ProfileHeader}`} style={{ backgroundColor: '#f6d1ee' }}>
        <img src={profile.image} alt={profile.owner} className={styles.ProfileImage} />
        <h1>{profile.owner}</h1>
        <p>{profile.email}</p>
        <p>You've been a member since {new Date(profile.created_at).toLocaleDateString()}</p>
      </div>

      {/* Personal Details */}
      <div className={`p-4 ${styles.PersonalDetails}`}>
        <h2>Personal Information</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {/* Display field-specific errors */}
            {errors?.non_field_errors && (
              <div className="alert alert-danger">
                {errors.non_field_errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors?.name && <div className="alert alert-danger">{errors.name[0]}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="street_address" className="form-label">
                Street Address
              </label>
              <input
                type="text"
                className="form-control"
                id="street_address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
              />
              {errors?.street_address && (
                <div className="alert alert-danger">{errors.street_address[0]}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              {errors?.city && <div className="alert alert-danger">{errors.city[0]}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              {errors?.state && <div className="alert alert-danger">{errors.state[0]}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="postal_code" className="form-label">
                Postal Code
              </label>
              <input
                type="text"
                className="form-control"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
              />
              {errors?.postal_code && (
                <div className="alert alert-danger">{errors.postal_code[0]}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors?.country && <div className="alert alert-danger">{errors.country[0]}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              {errors?.phone_number && (
                <div className="alert alert-danger">{errors.phone_number[0]}</div>
              )}
            </div>

            <button type="submit" className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}>
              Save Changes
            </button>
            <button
              type="button"
              className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p class="pb-3">
              <strong>Name:</strong> {profile.name}
            </p>
            <p class="pb-3">
              <strong>Street Address:</strong> {profile.street_address}
            </p>
            <p class="pb-3">
              <strong>City:</strong> {profile.city}
            </p>
            <p class="pb-3">
              <strong>State:</strong> {profile.state}
            </p>
            <p class="pb-3">
              <strong>Postal Code:</strong> {profile.postal_code}
            </p>
            <p class="pb-3">
              <strong>Country:</strong> {profile.country}
            </p>
            <p class="pb-3">
              <strong>Phone Number:</strong> {profile.phone_number}
            </p>

            <a
              className="styles.EditLink"
              onClick={handleEditClick}
              href="#"
              style={{ color: '#c9378b', fontWeight: 'bold', textDecoration: 'none' }}
            >
              Edit your details
            </a>
          </div>
        )}
      </div>

      {/* User's Products */}
      <div className={styles.ProductsSection}>
        <h2>My Products</h2>
        <div className={styles.ProductGrid}>
          {profile.products?.map((product) => (
            <div key={product.id} className={styles.ProductItem}>
              <img src={product.image} alt={product.name} className={styles.ProductImage} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
