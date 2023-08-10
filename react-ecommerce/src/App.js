import React from 'react';
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
const router=createBrowserRouter([{
  path:'/',
  element:<LoginPage/>
},
{
  path:'/home',
  element:<Home/>
},
{
  path:'/signup',
  element:<SignupPage/>
}])
function App() {
  return (
    <div className="App">
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
