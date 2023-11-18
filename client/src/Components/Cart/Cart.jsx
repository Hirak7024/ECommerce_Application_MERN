import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Utils/Context';
import { BsCartX } from "react-icons/bs";
import "./Cart.scss";
import CartItem from './CartItem/CartItem';

export default function Cart() {
    const { showCart, setShowCart, cart } = useContext(Context);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    // Update cart total price whenever the cart changes
    useEffect(() => {
        calculateCartTotal();
    }, [cart]);

    const calculateCartTotal = () => {
        const total = cart.reduce((acc, cartItem) => {
            return acc + cartItem.product.Price * cartItem.productQuantity;
        }, 0);
        setCartTotalPrice(total);
    };

    return (
        showCart && (
            <div className="shopping_cart">
                <div className="dark_background"></div>
                <div className="cart_container">
                    <div className="cartContainerHead">
                        <h1 className='header'>SHOPPING CART</h1>
                        <button className='close_btn' onClick={() => setShowCart(false)}>X</button>
                    </div>
                    <div className="cart">
                        {cart.length === 0 ?
                            <div className="empty_cart">
                                <BsCartX className='empty_cart_icon' />
                                <h1 className="empty_cart_head">No products in the Cart</h1>
                                <button className='returnToShop' onClick={() => setShowCart(false)}>Return To Shop</button>
                            </div> :
                            <div>
                                {cart && (cart?.map((item) => (
                                    <CartItem key={item._id} cartItem={item} />
                                )))}
                            </div>
                        }
                    </div>
                    <div className="cartContainerBottom">
                        {cart.length !== 0 &&
                            <>
                                <div className="subtotal_box">
                                    <h1 className='subtotal'>SUBTOTAL :</h1>
                                    <p className='subtotal_price'> &#8377;{cartTotalPrice}</p>
                                </div>
                                <button className="checkoutbtn">CHECKOUT</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    );
}
