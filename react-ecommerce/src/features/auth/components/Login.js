import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link,useNavigate,Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo3 from '../../images/logo3.png';
import { checkUserAsync, selectError, selectLoggedInUser } from '../authSlice';
// import {
//   increment,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';

export function Login() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const error=useSelector(selectError);
  const user=useSelector(selectLoggedInUser);
const navigate=useNavigate();
const { register, handleSubmit, watch, formState: { errors } } = useForm();
console.log(errors);
  return (
    <div>
      {user && <Navigate to={'/home'} replace={true}></Navigate>}
      <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto "
            style={{width:'10em',height:'10em'}}
            src={logo3}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-pink-950">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
            dispatch(checkUserAsync({email:data.email,password:data.password}))
         console.log(data)
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-pink-950">
                  Password
                </label>
                <div className="text-sm">
                  <Link to={'/forgotpassword'} className="font-semibold text-pink-950 hover:text-pink-950">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
              <input
                  id="password"
                {...register("password",{required:"password is required"})}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-pink-950 shadow-sm ring-1 ring-inset ring-rose-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-950 sm:text-sm sm:leading-6"
                />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              </div>
              {error && <p className='text-red-500'>{error.message}</p>}
            </div>

            <div>
              <button
              // onClick={()=>navigate('/home')}
                type="submit"
                className="flex w-full justify-center rounded-md bg-pink-950 px-3 py-1.5 text-sm font-semibold leading-6 text-orange-100 shadow-sm hover:bg-pink-900 hover:text-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-950"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={'/signup'} className="font-semibold leading-6 text-pink-950 hover:text-pink-950">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
