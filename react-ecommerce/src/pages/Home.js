import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/Product-list/Product_list'
export default function Home() {
  return (
    <div>
      <Navbar>
        <ProductList/>
      </Navbar>
    </div>
  )
}
