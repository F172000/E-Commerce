import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductlist'
export default function AdminProductlistPage(){
  return (
    <Navbar>
      <AdminProductList/>
    </Navbar>
  )
}