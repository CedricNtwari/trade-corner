import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProfileHeader from './ProfileHeader'
import PersonalDetails from './PersonalDetails'
import UserProducts from './UserProducts'
import LoadingSpinner from '../../components/LoadingSpinner'
import styles from '../../styles/ProfilePage.module.css'
import OrderHistorySection from '../../pages/orders/OrderHistorySection'

const ProfilePage = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}/`)
        console.log('Fetched profile data:', data)
        setProfile(data)
      } catch (err) {
        console.log('Error fetching profile:', err)
        setError('Profile not found')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [id])

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className={styles.ProfilePage}>
      <ProfileHeader profile={profile} />
      <PersonalDetails profile={profile} setProfile={setProfile} />
      <UserProducts products={profile.products} />

      {/* Adding the new Order History Section */}
      <OrderHistorySection userId={id} />
    </div>
  )
}

export default ProfilePage
