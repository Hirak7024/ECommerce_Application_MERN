import React, { useContext } from 'react';
// import Smartphone from "../../Assests/Smartphone.jpg";
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import { Context } from '../../Utils/Context';
import "./Card.scss";

export default function Card({post}) {
    const {productLiked, setProductLiked} = useContext(Context);
    const toggleLike=(e)=>{
        e.preventDefault();
        // e.stopPropagation();
        setProductLiked(!productLiked);
    }
    return (
        <div className="card_container">
            {productLiked ? <AiFillHeart className='like_icon colored' onClick={toggleLike}/>
             : <AiOutlineHeart className='like_icon'onClick={toggleLike} />}
            <div className="productImg_Container">
                <img src={post.Image} alt="" className="product_img" />
            </div>
            <h1 className="product_title">{post.Title}</h1>
            <p className="product_desc">{post.Description}</p>
            <p className="product_price">&#8377; {post.Price}</p>
        </div>
    )
}