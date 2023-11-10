import React, { useContext } from 'react';
import { Context } from '../../Utils/Context';
import { BsCartX } from "react-icons/bs";
import "./Cart.scss";
import CartItem from './CartItem/CartItem';

export default function Cart() {
    const { showCart, setShowCart, isCartEmpty } = useContext(Context);
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
                        {isCartEmpty ?
                            <div className="empty_cart">
                                <BsCartX className='empty_cart_icon' />
                                <h1 className="empty_cart_head">No products in the Cart</h1>
                                <button className='returnToShop' onClick={() => setShowCart(false)}>Return To Shop</button>
                            </div> :
                            <>
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />

                            </>
                        }
                    </div>
                    <div className="cartContainerBottom">
                        <div className="subtotal_box">
                            <h1 className='subtotal'>SUBTOTAL :</h1>
                            <p className='subtotal_price'> &#8377;1200</p>
                        </div>
                        <button className="checkoutbtn">CHECKOUT</button>
                    </div>
                </div>
            </div>
        )
    )
}
