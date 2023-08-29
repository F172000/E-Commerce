import React, { useState } from 'react';
import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link,useNavigate,Navigate } from 'react-router-dom';
import { deleteItemFromCartAsync, selectItems, updateItemsAsync } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import {  selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync, selectcurrentOrder } from '../features/Orders/orderSlice';
import { selectuserinfo } from '../features/user/userSlice';
export default function Checkout (){
  const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [selectaddress,setselectaddress]=useState(null);
    const [Payment,setPayment]=useState(null);
    const items=useSelector(selectItems);
const totalAmount=items.reduce((amount,item)=>item.price*item.quantity+amount,0);
const totalitems=items.reduce((total,item)=>item.quantity+total,0);
const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();
const user=useSelector(selectuserinfo);
const currentorder=useSelector(selectcurrentOrder);
const handleQuantity=(e,item)=>{
dispatch(updateItemsAsync({...item,quantity:+ e.target.value}));
};
const handleRemove=(e,id)=>{
  dispatch(deleteItemFromCartAsync(id));
}
const handleAddress=(e)=>{
  console.log(e.target.value);
  setselectaddress(user.addresses[e.target.value]);
}
const handlePayment=(e)=>{
console.log(e.target.value);
setPayment(e.target.value);
}
const handleOrder=(e)=>{
  if(selectaddress && Payment){
    const order={items,totalAmount,totalitems,user,Payment,selectaddress,status:'pending'}
  dispatch(createOrderAsync(order));
  console.log(e.target.value);
  setPayment(e.target.value);
  }
  else{
    alert('Enter address and Payment Method')
  }
 
  //TODO: redirect to order-success page
  //TODO: clear cart after order
  //TODO: on server change the stock number of items
}
  return (
    <>{!items.length>0 && <Navigate to={'/home'} replace={true}></Navigate>}
    {currentorder && <Navigate to={`/ordersuccess/${currentorder.id}`}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
        <div className='lg:col-span-3'>
        <form noValidate className='bg-white px-5 mt-12 mb-2' onSubmit={handleSubmit((data)=>{
           console.log(data);
           dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
         console.log(data);
         reset();
          })}>
        <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl py-3 font-semibold leading-7 text-pink-950">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-pink-950">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-pink-950">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:'name is required'})}
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
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
                  type="email"
                  {...register('email',{required:'email is required'})}
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="Phone" className="block text-sm font-medium leading-6 text-pink-950">
                Phone
              </label>
              <div className="mt-2">
              <input
                  id="Phone"
                  type="tel"
                  {...register('Phone',{required:'Phone No is required'})}
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street" className="block text-sm font-medium leading-6 text-pink-950">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:'street address is required'})}
                  id="street"
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
                  {...register('city',{required:'city is required'})}
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-pink-950">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:'state is required'})}
                  id="state"
                  className="block w-full rounded-md  py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-pink-950">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:'pinCode is required'})}
                  id="pinCode"
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
      {user.addresses.map((address,index) => (
        <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-rose-100">
          <div className="flex min-w-0 gap-x-4">
          <input
          onChange={handleAddress}
          value={index}
                    name="address"
                    type="radio"
                    className="h-4 w-4 border-orange-100 text-pink-950 focus:ring-pink-950"
                  />
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address.imageUrl} alt="" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-pink-950">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-500">Phone: {address.Phone}</p>
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
                    onChange={handlePayment}
                    value="cash"
                    name="payments"
                    type="radio"
                    checked={Payment==='cash'}
                    className="h-4 w-4 border-orange-100 text-pink-950 focus:ring-pink-950"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-pink-950">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    onChange={handlePayment}
                    value="card"
                    name="card"
                    checked={Payment==='card'}
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
    <div className="mx-auto mt-12 bg-white max-w-7xl px-3 py-6 sm:px-3 lg:px-3">

<div className="border-t border-rose-200 px-0 py-6 sm:px-0">
<h1 className="text-4xl my-5 font-bold tracking-tight text-pink-950">Cart</h1>
  <div className="flow-root">
    <ul role="list" className="-my-6 divide-y divide-rose-100">
      {items.map((item) => (
        <li key={item.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-rose-100">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-pink-950">
                <h3>
                  <a href={item.href}>{item.title}</a>
                </h3>
                <p className="ml-4">${item.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="text-gray-500">
              <label htmlFor="email" className="inline mr-2 text-sm font-medium leading-6 text-pink-950">
                Qty
              </label>
              <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
             </div>

              <div className="flex">
                <button
                onClick={(e)=>handleRemove(e,item.id)}
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
<div className="flex justify-between my-2 text-base font-medium text-pink-950">
  <p>Subtotal</p>
  <p>${totalAmount}</p>
</div>
<div className="flex justify-between my-2 text-base font-medium text-pink-950">
  <p>Total Items in Cart</p>
  <p>{totalitems} items</p>
</div>
<p className="mt-0.5 text-sm text-pink-950">Shipping and taxes calculated at checkout.</p>
<div className="mt-6">
  <div
  onClick={handleOrder}
    className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-pink-950 px-6 py-3 text-base font-medium text-orange-100 shadow-sm hover:bg-pink-950"
  >
    Order Now
  </div>
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
    </div>
    </div>
    </div>
    </>
  );
}
