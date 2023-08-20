import React, { useState } from 'react';
import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link,useNavigate } from 'react-router-dom';
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
const addresses=[
    {
        name:'John wick',
        street:'11th Main',
        city:'Islamabad',
        pincode:44000,
        state:'Islamabad',
        phone:12398734929
    },
    {
        name:'John wick',
        street:'15th Main',
        city:'Islamabad',
        pincode:54000,
        state:'Islamabad',
        phone:12398734929
    }
]
export default function Checkout (){
    const [open, setOpen] = useState(true);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
        <div className='lg:col-span-3'>
        <form className='bg-white px-5 mt-12 mb-2'>
        <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl py-3 font-semibold leading-7 text-pink-950">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-pink-950">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-pink-950">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-pink-950">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-900 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-pink-950">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-pink-950">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5  text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-pink-950">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-pink-950">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-pink-950">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md  py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-pink-950">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-200 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-pink-900">
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-pink-950 px-3 py-2 text-sm font-semibold text-orange-100 shadow-sm hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
        >
        Add Address
        </button>
      </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-pink-950">Addresses</h2>
          <p className="mt-1 text-sm leading-6 text-pink-950">
           Choose from existing Address
          </p>
          <ul role="list">
      {addresses.map((address) => (
        <li key={address.email} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-rose-100">
          <div className="flex min-w-0 gap-x-4">
          <input
                    name="address"
                    type="radio"
                    className="h-4 w-4 border-orange-100 text-pink-950 focus:ring-pink-950"
                  />
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address.imageUrl} alt="" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-pink-950">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pincode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-500">Phone: {address.phone}</p>
            <p className="text-sm leading-6 text-gray-500">{address.city}</p>
          </div>
        </li>
      ))}
    </ul>
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-pink-950">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-pink-950">Choose One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    name="payments"
                    type="radio"
                    className="h-4 w-4 border-orange-100 text-pink-950 focus:ring-pink-950"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-pink-950">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="payments"
                    type="radio"
                    className="h-4 w-4 border-orange-100 text-pink-950 focus:ring-pink-950"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-pink-90">
                    Card Payment
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </form>
    </div>
    <div className='lg:col-span-2'>
    <div className="mx-auto mt-12  bg-white max-w-7xl px-0 py-6 sm:px-0 lg:px-8">

<div className="border-t border-gray-200 px-0 py-6 sm:px-0">
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
              <div className="text-pink-950">
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
  <a
    href="#"
    className="flex items-center justify-center rounded-md border border-transparent bg-pink-950 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-900"
  >
    Pay and Order
  </a>
</div>
<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
  <p>
    or
    <Link to={'/pay'}>
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
    </div>
    </div>
    </div>
  );
}
