import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Register"
import Login  from './components/Login';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAdd from './components/User/UserAdd';
import UserList from './components/User/UserList';
import UserEdit from './components/User/UserEdit';
import Product from './components/Product/Product';
import ProductList from './components/Product/ProductList';
import ForgotPassword from './components/User/ForgotPassword';
import VerifyOTP from './components/User/VerifyOTP';

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product-list' element={<ProductList />} />
        <Route path='/user' element={<UserList />} />
        <Route path='/add-user' element={<UserAdd />} />
        <Route path='/edit-user/:userId' element={<UserEdit />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path='/verify-otp' element={<VerifyOTP />} />
      </Routes>
    </>
  )  
}

export default App;
