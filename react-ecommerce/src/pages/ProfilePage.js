import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import User from '../features/user/components/userProfile'
export default function ProfilePage(){
  return (
    <Navbar>
        <h1 className='mx-auto text-2xl text-pink-950'>My Profile</h1>
      <User/>
    </Navbar>
  )
} 