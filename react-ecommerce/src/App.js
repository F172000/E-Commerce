import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallItemsAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
const router=createBrowserRouter([{
  path:'/',
  element:<LoginPage/>
},
{
  path:'/home',
  element:<Protected><Home/></Protected>
},
{
  path:'/signup',
  element:<SignupPage/>
},
{
path:'/cart',
element:<Protected><CartPage/></Protected>
},
{
  path:'/checkout',
  element:<Protected><Checkout/></Protected>
},{
  path:'/productdetail/:id',
  element:<Protected><ProductDetailPage/></Protected>
}])
function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);
  console.log(user);
  useEffect(()=>{
    if(user){
      dispatch(fetchallItemsAsync(user.id));
    }
  },[dispatch,user.id])
  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
