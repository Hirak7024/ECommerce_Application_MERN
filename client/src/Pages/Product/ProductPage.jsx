import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { Context } from '../../Utils/Context';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ProductPage.scss";

export default function ProductPage() {
  const { userData, isLoggedIn, wishListedProducts, setWishListedProducts, cartItems, setCartItems, cart, setCart } = useContext(Context);
  const [singleProduct, setSingleProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [productLiked, setProductLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };
  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };

  useEffect(() => {

    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products/getProductById/${id}`)

        setSingleProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Some Error Occured");
      }
    }
    fetchProductDetails();
  }, [])

  const productId = singleProduct._id;

  useEffect(() => {
    const isProductLiked = wishListedProducts.some(product => product._id === productId);
    setProductLiked(isProductLiked);
  }, [wishListedProducts, productId]);

  const addProductToWishList = async () => {
    try {
      const response = await axios.post(
        '/api/products/addProducts/toWishlist',
        {
          productId: singleProduct._id,
          userId: userData.userResponse._id
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`
          },
        }
      );

      // Toggle the productLiked state
      setProductLiked(prevProductLiked => !prevProductLiked);
      setWishListedProducts(response.data.wishlistedProducts);
    } catch (error) {
      console.log(error);
      toast.error('Error adding product to wishlist');
    }
  };

  const toggleLike = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You need to login first");
    } else {
      if (productLiked === false) {
        await addProductToWishList();
      }
    }
  }


  const toggleAddToCart = () => {
    if (!isLoggedIn) {
      toast.error('You need to login first');
    } else {
      const existingCartItemIndex = cart.findIndex((item) => item.product._id === singleProduct._id);

      if (existingCartItemIndex !== -1) {
        // If the product is already in the cart, update its quantity
        const updatedCart = [...cart];
        updatedCart[existingCartItemIndex].productQuantity += quantity;
        setCart(updatedCart);
      } else {
        // If the product is not in the cart, add it
        const newCartItem = {
          product: singleProduct,
          productQuantity: quantity,
        };
        setCart((prevCart) => [...prevCart, newCartItem]);
      }

      // Update the global cartItems state
      setCartItems({
        product: singleProduct,
        productQuantity: quantity,
      });

      // Optionally, you can show a toast or perform any other action
      toast.success('Product added to cart');
    }
  };

  console.log('From Product Page:', singleProduct);

  return (
    <div className='ProductPageContainer'>
      {loading ? (<h3 className="loading_text">Loading...</h3>) :
        error ? (<h3 className="error_text">{error}</h3>) :
          (
            <>
              <div className="left">
                <img src={singleProduct.Image} alt="" />
              </div>
              <div className="right">
                <h1 className="productTitle">{singleProduct.Title}</h1>
                <p className="productDesc">{singleProduct.Description}</p>
                <p className="productPrice">&#8377; {singleProduct.Price}</p>
                <div className="quantity_container">
                  <button className="quantity_btn" onClick={decrement}>-</button>
                  <p className="quantity">{quantity}</p>
                  <button className="quantity_btn" onClick={increment}>+</button>
                </div>
                <div className="btn_container">
                  <button className="addToCart" onClick={toggleAddToCart}>
                    {/* {addedToCart ? <> */}
                    {/* <BsFillCartCheckFill className='icon' /> Product Added */}
                    {/* </> : <> */}
                    <BsFillCartPlusFill className='icon' />
                    Add to Cart
                    {/* </> */}
                    {/* } */}
                  </button>
                  <button className="wishlist" onClick={toggleLike}>
                    {productLiked ? <>
                      <AiFillHeart className='icon' /> Wishlisted
                    </> : <>
                      <AiOutlineHeart className='icon' />
                      Add to Wishlist
                    </>
                    }</button>
                </div>
                <hr className='division_line' />
                <p className="labels"><strong>Category :</strong> {singleProduct.Category && singleProduct.Category.toUpperCase()}</p>
                <p className="labels"><strong>Brand :</strong> {singleProduct.Brand}</p>
              </div>
            </>
          )
      }
    </div>
  )
}
