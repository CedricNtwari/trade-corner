import { useState } from 'react'
import axios from 'axios'
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/ProfilePage.module.css'

const PersonalDetails = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: profile.name || '',
    street_address: profile.street_address || '',
    city: profile.city || '',
    state: profile.state || '',
    postal_code: profile.postal_code || '',
    country: profile.country || '',
    phone_number: profile.phone_number || '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    try {
      const response = await axios.put(`/profiles/${profile.id}/`, formData)
      setProfile(response.data)
      setIsEditing(false)
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data)
      }
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  return (
    <div className={`p-4 ${styles.PersonalDetails}`}>
      <h2>Personal Information</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
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
          <p className="mb-3">
            <strong>Name:</strong> {profile.name}
          </p>
          <p className="mb-3">
            <strong>Street Address:</strong> {profile.street_address}
          </p>
          <p className="mb-3">
            <strong>City:</strong> {profile.city}
          </p>
          <p className="mb-3">
            <strong>State:</strong> {profile.state}
          </p>
          <p className="mb-3">
            <strong>Postal Code:</strong> {profile.postal_code}
          </p>
          <p className="mb-3">
            <strong>Country:</strong> {profile.country}
          </p>
          <p className="mb-3">
            <strong>Phone Number:</strong> {profile.phone_number}
          </p>
          <button
            type="submit"
            className={`btn ${btnStyles.Button} ${btnStyles.Bright}`}
            onClick={handleEditClick}
          >
            Edit your details
          </button>
        </div>
      )}
    </div>
  )
}

export default PersonalDetails
