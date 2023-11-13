import React, { useContext,useEffect, useState } from 'react';
import ProductImg from "../../Assests/Headphone_Banner.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { Context } from '../../Utils/Context';
import { useParams } from 'react-router-dom';
import axios from "axios";
import "./ProductPage.scss";

export default function ProductPage() {
  const { productLiked, setProductLiked, addedToCart, setAddedToCart } = useContext(Context);
  const [singleProduct, setSingleProduct] = useState("");
  const toggleLiked = () => {
    setProductLiked(!productLiked);
  }
  const toggleAddToCart = () => {
    setAddedToCart(!addedToCart);
  }
  const {id} = useParams();

  useEffect(() => {
    
    const fetchProductDetails = async () => {
        // setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8001/api/products/getProductById/${id}`)

            setSingleProduct(response.data);
            // setLoading(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
            // setError("Some Error Occured");
        }
    }
    fetchProductDetails();
}, [])
console.log(singleProduct);
  return (
    <div className='ProductPageContainer'>
      <div className="left">
        <img src={singleProduct.Image} alt="" />
      </div>
      <div className="right">
        <h1 className="productTitle">{singleProduct.Title}</h1>
        <p className="productDesc">{singleProduct.Description}</p>
        <p className="productPrice">&#8377; {singleProduct.Price}</p>
        <div className="quantity_container">
          <button className="quantity_btn">-</button>
          <p className="quantity">1</p>
          <button className="quantity_btn">+</button>
        </div>
        <div className="btn_container">
          <button className="addToCart" onClick={toggleAddToCart}>
            {addedToCart ? <>
              <BsFillCartCheckFill className='icon'/> Product Added
            </> : <>
              <BsFillCartPlusFill className='icon' />
              Add to Cart
            </>
            }
          </button>
          <button className="wishlist" onClick={toggleLiked}>
            {productLiked ? <>
              <AiFillHeart className='icon'/> Wishlisted
            </> : <>
              <AiOutlineHeart className='icon'/>
              Add to Wishlist
            </>
            }</button>
        </div>
        <hr className='division_line' />
        <p className="labels"><strong>Category :</strong> {singleProduct.Category && singleProduct.Category.toUpperCase()}</p>
        <p className="labels"><strong>Brand :</strong> Boat</p>
      </div>
    </div>
  )
}
