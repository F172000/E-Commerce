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
import PageNotFound from './pages/404';
import Ordersuccess from './pages/Ordersuccess';
import Userorder from './features/user/components/userOrder';
import UserOrdersPage from './pages/userOrdersPage';
import ProfilePage from './pages/ProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
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
},{
  path:'*',
  element:<PageNotFound/>
},{
  path:'/ordersuccess/:id',
  element:<Ordersuccess/>
},
{
  path:'/orders',
  element:<UserOrdersPage/>
},
{
  path:'/profile',
  element:<ProfilePage/>
}])
function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);
  console.log(user);
  useEffect(()=>{
    if(user && user.id){
      dispatch(fetchallItemsAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  },[dispatch,user])
  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
