import React, { useContext } from 'react';
import { Context } from '../../../Utils/Context';
import "./CartItem.scss";

export default function CartItem({ cartItem }) {

    const { cart, setCart } = useContext(Context);
    const removeFromCart = () => {
        // Filter out the cartItem to be removed
        const updatedCart = cart.filter((item) => item.product._id !== cartItem.product._id);

        // Update the global cart state
        setCart(updatedCart);
    };

    const decrement = () => {
        if (cartItem.productQuantity > 1) {
            const updatedCart = cart.map((item) =>
                item.product._id === cartItem.product._id
                    ? { ...item, productQuantity: item.productQuantity - 1 }
                    : item
            );
            setCart(updatedCart);
        }
    };

    const increment = () => {
        const updatedCart = cart.map((item) =>
            item.product._id === cartItem.product._id
                ? { ...item, productQuantity: item.productQuantity + 1 }
                : item
        );
        setCart(updatedCart);
    };
    
    return (
        <div className='CartItem_Container'>
            <div className="close_btn" onClick={removeFromCart}>x</div>
            <div className="left">
                <img src={cartItem.product.Image} alt="" />
            </div>
            <div className="right">
                <h1 className="productTitle">{cartItem.product.Title}</h1>
                <div className="quantity_container">
                    <button className="quantity_btn" onClick={decrement}>-</button>
                    <p className="quantity">{cartItem.productQuantity}</p>
                    <button className="quantity_btn" onClick={increment}>+</button>
                </div>
                <p className='total_price'>{cartItem.productQuantity} x &#8377;{cartItem.product.Price}</p>
            </div>
        </div>
    )
}
