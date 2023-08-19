import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
// import {
//   increment,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';
import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

export function Cart() {
  // const count = useSelector(selectCount);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
const navigate=useNavigate();

  return (
    <div className="mx-auto mt-4 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

<div className="border-t border-rose-200 px-4 py-6 sm:px-6">
<h1 className="text-4xl my-5 font-bold tracking-tight text-pink-950">Cart</h1>
  <div className="flow-root">
    <ul role="list" className="-my-6 divide-y divide-rose-100">
      {products.map((product) => (
        <li key={product.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-rose-100">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-pink-950">
                <h3>
                  <a href={product.href}>{product.name}</a>
                </h3>
                <p className="ml-4">{product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="text-gray-500">
              <label htmlFor="email" className="inline mr-2 text-sm font-medium leading-6 text-pink-950">
                Qty
              </label>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
             </div>

              <div className="flex">
                <button
                  type="button"
                  className="font-medium text-pink-950 hover:text-pink-950"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>


<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<div className="flex justify-between text-base font-medium text-pink-950">
  <p>Subtotal</p>
  <p>$262.00</p>
</div>
<p className="mt-0.5 text-sm text-pink-950">Shipping and taxes calculated at checkout.</p>
<div className="mt-6">
  <Link
   to={'/checkout'}
    className="flex items-center justify-center rounded-md border border-transparent bg-pink-950 px-6 py-3 text-base font-medium text-orange-100 shadow-sm hover:bg-pink-950"
  >
    Checkout
  </Link>
</div>
<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
  <p>
    or
    <Link to={'/home'}>
    <button
      type="button"
      className="font-medium text-pink-950 hover:text-pink-950"
      onClick={() => setOpen(false)}
    >
      Continue Shopping
      <span aria-hidden="true"> &rarr;</span>
    </button>
    </Link>
  </p>
</div>
</div>
      </div>
    
  );
}
