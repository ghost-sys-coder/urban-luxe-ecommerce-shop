import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const Profile = () => {
  return (
    <div className='w-full h-screen flex justify-center mt-5'>
      <UserProfile routing='hash' />
    </div>
  )
}

export default Profile