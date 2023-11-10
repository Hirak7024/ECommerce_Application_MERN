import React, { useContext } from 'react';
import ProductImg from "../../Assests/Headphone_Banner.jpg";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { Context } from '../../Utils/Context';
import "./ProductPage.scss";

export default function ProductPage() {
  const { productLiked, setProductLiked, addedToCart, setAddedToCart } = useContext(Context);
  const toggleLiked = () => {
    setProductLiked(!productLiked);
  }
  const toggleAddToCart = () => {
    setAddedToCart(!addedToCart);
  }
  return (
    <div className='ProductPageContainer'>
      <div className="left">
        <img src={ProductImg} alt="" />
      </div>
      <div className="right">
        <h1 className="productTitle">Product Title</h1>
        <p className="productDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ipsam assumenda tempora pariatur, enim laboriosam incidunt delectus? Mollitia, quidem minus non, totam corrupti amet neque dolorem repudiandae, laudantium perspiciatis obcaecati.</p>
        <p className="productPrice">&#8377; 1299</p>
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
        <p className="labels"><strong>Category :</strong> Headphones</p>
        <p className="labels"><strong>Brand :</strong> Boat</p>
      </div>
    </div>
  )
}
