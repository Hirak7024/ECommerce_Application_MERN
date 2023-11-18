import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Context } from '../../Utils/Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./Card.scss";

export default function Card({ post }) {
    const { isLoggedIn, userData, wishListedProducts, setWishListedProducts } = useContext(Context);
    const [productLiked, setProductLiked] = useState(false);
    const productId = post._id;

    // Check if the productId is in wishListedProducts
    useEffect(() => {
        const isProductLiked = wishListedProducts.some(product => product._id === productId);
        setProductLiked(isProductLiked);
    }, [wishListedProducts, productId]);

    const addProductToWishList = async () => {
        try {
            const response = await axios.post(
                '/api/products/addProducts/toWishlist',
                {
                    productId: post._id,
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

            console.log("From Card:",response.data)

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
            await addProductToWishList();
        }
    }

    return (
        <div className="card_container">
            {productLiked ? <AiFillHeart className='like_icon colored' onClick={toggleLike} />
                : <AiOutlineHeart className='like_icon' onClick={toggleLike} />}
            <div className="productImg_Container">
                <img src={post.Image} alt="" className="product_img" />
            </div>
            <h1 className="product_title">{post.Title}</h1>
            <p className="product_desc">{post.Description}</p>
            <p className="product_price">&#8377; {post.Price}</p>
        </div>
    );
}
