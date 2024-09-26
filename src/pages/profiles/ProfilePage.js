import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProfileHeader from './ProfileHeader'
import PersonalDetails from './PersonalDetails'
import UserProducts from './UserProducts'
import styles from '../../styles/ProfilePage.module.css'

const ProfilePage = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}/`)
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
      <ProfileHeader profile={profile} />
      <PersonalDetails profile={profile} setProfile={setProfile} />
      <UserProducts products={profile.products} />
    </div>
  )
}

export default ProfilePage
