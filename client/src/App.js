import React, { useEffect, useContext, useState } from 'react';
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function App() {
  const { userData, setUserData, setIsLoggedIn, showCart, wishListedProducts, setWishListedProducts } = useContext(Context);
  // const [decodedToken, setDecodedToken] = useState();

  const fetchDecodedTokenPayload = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (authToken) {
        const response = await axios.get('/api/users/getDecode/TokenPayload', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        //fetching the wishlisted products here only so that everytime the page reloads, it can directly get the userId from the response of decodedToken.
        const userID = response.data.payload._id;
        const response2 = await axios.post("/api/users/getProducts/wishlisted", { userId: userID });
        setWishListedProducts(response2.data.wishlistedProducts);

        // Check if the token is still valid
        const currentTime = Date.now() / 1000;
        if (response.data.payload.exp < currentTime) {
          // Token is expired, clear user data
          localStorage.removeItem("authToken");
          toast.error("Token Expired. Please Login again")
          setIsLoggedIn(false);
          setUserData(null);
        } else {
          setUserData({ userResponse: response.data.payload, token: authToken });
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error('Error fetching decoded token:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDecodedTokenPayload();
    };

fetchData();
  }, []); 

  console.log("From App: ",wishListedProducts)

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
        <Route path='/wishlistPage' element={<WishListPage />} />
        <Route path={`/categoryProduct/:pageNumber`} element={<CategoryProduct />} />
      </Routes>
      <ToastContainer />
    </>
  )
}
