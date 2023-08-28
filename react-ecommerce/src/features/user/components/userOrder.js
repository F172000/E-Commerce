import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserorderAsync, selectuserorders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
export default function Userorder(){
    const dispatch=useDispatch();
    const user=useSelector(selectLoggedInUser);
    const orders=useSelector(selectuserorders);
    useEffect(()=>{
        if(user && user.id){
            dispatch(fetchLoggedInUserorderAsync(user.id))
        }
    },[])
  return (
    <>
    {orders.map((order)=><div >
        <div className="mx-auto mt-4 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

<div className="border-t border-rose-200 px-4 py-6 sm:px-6">
<h1 className="text-4xl my-5 font-bold tracking-tight text-pink-950">Order Number is: {order.id}</h1>
<h3 className="text-xl my-5 font-bold tracking-tight text-red-900">Order Status: {order.status}</h3>
  <div className="flow-root">
    <ul role="list" className="-my-6 divide-y divide-rose-100">
      {order.items.map((order) => (
        <li key={order.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-rose-100">
            <img
              src={order.thumbnail}
              alt={order.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-pink-950">
                <h3>
                  <a href={order.href}>{order.title}</a>
                </h3>
                <p className="ml-4">${order.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{order.brand}</p>
            </div>
            <div className="flex flex-1 orders-end justify-between text-sm">
              <div className="text-gray-500">
              <label htmlFor="email" className="inline mr-2 text-sm font-medium leading-6 text-pink-950">
                Qty:{order.quantity}
              </label>
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
  <p>${order.totalAmount}</p>
</div>
<div className="flex justify-between my-2 text-base font-medium text-pink-950">
  <p>Total Items in Cart</p>
  <p>{order.totalitems} items</p>
</div>
<p className='mt-0.5 text-sm text-gray-500'>
    Shipping Address:
</p>
<div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-rose-100">
          <div className="flex min-w-0 gap-x-4">
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={order.selectedAddress.imageUrl} alt="" /> */}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-pink-950">{order.selectaddress.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectaddress.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectaddress.pinCode}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-500">Phone: {order.selectaddress.Phone}</p>
            <p className="text-sm leading-6 text-gray-500">{order.selectaddress.city}</p>
          </div>
        </div>
      </div>
      </div>
      </div>)}
    </>
  );
}


