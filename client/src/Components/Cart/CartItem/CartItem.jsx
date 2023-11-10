import React from 'react';
import ProductImg from "../../../Assests/Headphone2.jpg";
import "./CartItem.scss";

export default function CartItem() {
    return (
        <div className='CartItem_Container'>
            <div className="close_btn">x</div>
            <div className="left">
                <img src={ProductImg} alt="" />
            </div>
            <div className="right">
                <h1 className="productTitle">Product Title</h1>
                <div className="quantity_container">
                    <button className="quantity_btn">-</button>
                    <p className="quantity">1</p>
                    <button className="quantity_btn">+</button>
                </div>
                <p className='total_price'>1 x &#8377;1200</p>
            </div>
        </div>
    )
}
