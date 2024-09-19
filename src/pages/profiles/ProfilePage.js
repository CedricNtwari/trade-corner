import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosRes } from '../../api/axiosDefaults'
import styles from '../../styles/ProfilePage.module.css'

const ProfilePage = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosRes.get(`/profiles/${id}/`)
        setProfile(data)
      } catch (err) {
        setError('Profile not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  if (loading) return <p>Loading profile...</p>
  if (error) return <p>{error}</p>

  return (
    <div className={styles.ProfilePage}>
      <h1>{profile.owner}'s Profile</h1>
      <img src={profile.image} alt={`${profile.owner}'s profile`} className={styles.ProfileImage} />
      {/* Display more profile details as needed */}
      <p>{profile.name}</p>
      <p>{profile.street_address}</p>
      <p>
        {profile.city}, {profile.state} {profile.postal_code}
      </p>
      {/* Add more fields as required */}
    </div>
  )
}

export default ProfilePage
