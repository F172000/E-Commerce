import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/logo3.png';
import { useForm } from "react-hook-form";
import { selectLoggedInUser,createUserAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';
// import {
//   increment,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';

export function Signup() {
  // const count = useSelector(selectCount);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const user=useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
console.log(errors);
  return (
    <div>
{user && <Navigate to={'/home'} replace={true}></Navigate>}
      <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto"
            style={{width:'10em',height:'10em'}}
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-pink-950">
           Create a New Account
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
            dispatch(createUserAsync({
              email:data.email,
              password:data.password,
              addresses:[],role:'user'
            //TODO: this role can be directly given on backend
          }))
         console.log(data);
          })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-pink-950">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                 {...register("email",{required:"email is required",pattern: {value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message:"email is not valid"} })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-950 sm:text-sm sm:leading-6"
                />
                 {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center   justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-pink-950">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                {...register("password",{required:"password is required",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message:`-at least 8 characters\n
                -must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                -Can contain special characters`}})}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-950 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              </div>
</div>
<div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-pink-950">
                  Comfirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                 {...register("confirmPassword",{required:"confirm password is required", validate: (value, formValues) => value === formValues.password || 'password not matching'})}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-950 sm:text-sm sm:leading-6"
                />
                 {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
              </div>
              
            </div>
            

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-950 px-3 py-1.5 text-sm font-semibold leading-6 text-orange-100 shadow-sm hover:bg-pink-900 hover:text-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={'/'} className="font-semibold leading-6 text-pink-950 hover:text-pink-950">
              Login
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
