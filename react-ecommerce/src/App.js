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
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductlistPage from './pages/AdminProductlistPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
const router=createBrowserRouter([{
  path:'/',
  element:<LoginPage/>
},
{
  path:'/home',
  element:<Protected><Home/></Protected>
},
{
  path:'/admin',
  element:(
    <ProtectedAdmin><AdminProductlistPage/></ProtectedAdmin>
  )
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
  path:'/admin/productdetail/:id',
  element:<ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>
},
{
  path:'/admin/productform',
  element:<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
},
{
  path:'/admin/orders',
  element:<ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>
},
{
  path:'/admin/productform/edit/:id',
  element:<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
},
{
  path:'/orders',
  element:<UserOrdersPage/>
},
{
  path:'/profile',
  element:<ProfilePage/>
},
{
  path:'/logout',
  element:<Logout/>
},
{
  path:'/forgotpassword',
  element:<ForgotPasswordPage/>
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
