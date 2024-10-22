import React from 'react'
import styles from '../../styles/ProfilePage.module.css'

const ProfileHeader = ({ profile }) => {
  return (
    <div className={`p-4 ${styles.ProfileHeader}`} style={{ backgroundColor: '#f6d1ee' }}>
      <img
        src={profile?.image || 'default-image-url.jpg'}
        alt={profile?.owner || 'User'}
        className={styles.ProfileImage}
      />

      <h1>{profile?.owner || 'Unknown User'}</h1>
      <p>{profile?.email || 'No email provided'}</p>
      <p>
        You&apos;ve been a member since{' '}
        {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
      </p>
    </div>
  )
}

export default ProfileHeader
