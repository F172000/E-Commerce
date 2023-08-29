import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../auth/authSlice';
import { selectuserinfo, updateUserAsync } from '../userSlice';
import { useForm } from "react-hook-form";
export default function User(){
const dispatch=useDispatch();
const user=useSelector(selectuserinfo);
const [selectedEditIndex,setselectedEditIndex]=useState(-1);
const [showAddAddressForm,setAddAddressForm]=useState(false);
console.log(user);
const { register,reset,setValue, handleSubmit, watch, formState: { errors } } = useForm();
const handleEdit=(addressUpdate,index)=>{
  const newUser={...user,addresses:[...user.addresses]}//for shallow copy issue
  newUser.addresses.splice(index,1,addressUpdate);
  dispatch(updateUserAsync(newUser));
  setselectedEditIndex(-1);
}
const handleRemove=(e,index)=>{
const newUser={...user,addresses:[...user.addresses]}//for shallow copy issue
newUser.addresses.splice(index,1);
dispatch(updateUserAsync(newUser));
}
const handleAdd=(address)=>{
  const newUser={...user,addresses:[...user.addresses,address]}//for shallow copy issue
  dispatch(updateUserAsync(newUser));
  setAddAddressForm(false);
}
const handleEditForm=(index)=>{
setselectedEditIndex(index);
const address=user.addresses[index];
setValue('name',address.name);
setValue('email',address.email);
setValue('Phone',address.Phone);
setValue('street',address.street);
setValue('city',address.city);
setValue('state',address.state);
setValue('pinCode',address.pinCode);
}
  return (
    <div>
        <div className="mx-auto mt-4 bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

<div className="border-t border-rose-200 px-4 py-6 sm:px-6">
<h1 className="text-4xl my-5 font-bold tracking-tight text-pink-950">Name: {user.name? user.name:'New User'}</h1>
<h3 className="text-xl my-5 font-bold tracking-tight text-red-900">email address: {user.email}</h3>
{user.role==='admin' && (<h3 className="text-xl my-5 font-bold tracking-tight text-red-900">role: {user.role}</h3>)}
</div>


<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
<button
onClick={e=>{setAddAddressForm(true);setselectedEditIndex(-1);}}
          type="submit"
          className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-orange-100 shadow-sm hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
        >
        Add New Address
        </button>
        {showAddAddressForm?
  <form noValidate className='bg-white px-5 mt-12 mb-2' onSubmit={handleSubmit((data)=>{
           console.log(data);
          handleAdd(data);
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
        {/* <button type="button" className="text-sm font-semibold leading-6 text-pink-900">
          Reset
        </button> */}
          <button
          onClick={e=>setAddAddressForm(false)}
          type="submit"
          className="rounded-md bg-pink-950 px-3 py-2 text-sm font-semibold text-orange-100 shadow-sm hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
        >
        Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-pink-950 px-3 py-2 text-sm font-semibold text-orange-100 shadow-sm hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
        >
        Add Address
        </button>
      </div>
      </div>
    </form>:null}
<p className='mt-0.5 text-sm text-gray-500'>
    Your Addresses:
</p>
{user.addresses.map((address,index)=>
<div>
  {selectedEditIndex===index?
  <form noValidate className='bg-white px-5 mt-12 mb-2' onSubmit={handleSubmit((data)=>{
           console.log(data);
          handleEdit(data,index);
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
        {/* <button type="button" className="text-sm font-semibold leading-6 text-pink-900">
          Reset
        </button> */}
          <button
          onClick={e=>setselectedEditIndex(-1)}
          type="submit"
          className="rounded-md bg-pink-950 px-3 py-2 text-sm font-semibold text-orange-100 shadow-sm hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
        >
        Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-pink-950 px-3 py-2 text-sm font-semibold text-orange-100 shadow-sm hover:bg-pink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
        >
        Edit Address
        </button>
      </div>
      </div>
    </form>:null}
<div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-rose-100">
          <div className="flex min-w-0 gap-x-4">
            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={order.selectedAddress.imageUrl} alt="" /> */}
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
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <button
                onClick={(e)=>handleEditForm(index)}
                  type="button"
                  className="font-medium text-pink-950 hover:text-pink-950"
                >
                  Edit
                </button>
                <button
                onClick={(e)=>handleRemove(e,index)}
                  type="button"
                  className="font-medium text-pink-950 hover:text-pink-950"
                >
                  Remove
                </button>
                </div>
        
        </div>
        </div>
         )}
      </div>
      </div>
    </div>
    
  )
}
