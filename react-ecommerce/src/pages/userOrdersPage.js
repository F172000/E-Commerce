import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Userorder from '../features/user/components/userOrder'
export default function UserOrdersPage(){
  return (
    <Navbar>
        <h1 className='mx-auto text-2xl text-pink-950'>My Orders</h1>
      <Userorder/>
    </Navbar>
  )
} 