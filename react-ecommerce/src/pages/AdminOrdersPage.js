import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminOrders from '../features/admin/components/AdminOrders'
export default function AdminOrdersPage(){
  return (
    <Navbar>
      <AdminOrders/>
    </Navbar>
  )
}