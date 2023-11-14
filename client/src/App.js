import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar"
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProductPage from './Pages/Product/ProductPage';
import WishListPage from './Pages/Wishlist/WishListPage';
import { Context } from './Utils/Context';
import Cart from './Components/Cart/Cart';
import CategoryProduct from './Pages/CategoryProduct/CategoryProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { showCart } = useContext(Context);
  useEffect(() => {
    if (showCart) {
      document.body.classList.add('disable_scroll');
    } else {
      document.body.classList.remove('disable_scroll');
    }

    // Cleanup: remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('disable_scroll');
    };
  }, [showCart]);
  return (
    <>
      <Navbar />
      <Cart />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/productPage/:id' element={<ProductPage />} />
        <Route path='/wishlistPage/:id' element={<WishListPage />} />
        <Route path={`/categoryProduct/:pageNumber`} element={<CategoryProduct />} />
        {/* <Route path={"/categoryProduct"} element={<CategoryProduct />} /> */}
      </Routes>
      <ToastContainer/>
    </>
  )
}
