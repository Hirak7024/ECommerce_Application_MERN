import React, { useContext, useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Context } from '../../Utils/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./navbar.scss";

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, setUserData, setShowCart, cart, setCart, setWishListedProducts } = useContext(Context);

    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;  //it counts by how many pixels the screen is getting scrolled in y direction
        if (offset > 200) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        setWishListedProducts([])
        setIsLoggedIn(false);
        setUserData({});
        toast.success("Logged Out")
    }

    const openWishListPage = () => {
        if (!isLoggedIn) {
            toast.error("You need to login first");
        } else {
            navigate("/wishlistPage")
        }
    }
    const openShoppingCart = () => {
        if (!isLoggedIn) {
            toast.error("You need to login first");
        } else {
            setShowCart(true);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])
    return (
        <>
            <div className={`navbar-container ${scrolled ? "sticky_navbar" : ""}`}>
                <div className="left">
                    <h1 onClick={() => navigate("/")}> E Store</h1>
                </div>
                <div className="middle">
                    <div className="searchBox">
                        <input type="text" placeholder='Search' />
                        <AiOutlineSearch className='searchIcon' />
                    </div>
                </div>
                <div className="right">
                    <div className='icons'>
                        <div className='icon' onClick={openWishListPage} ><AiOutlineHeart className='right_icons' /></div>
                        <div className='icon' onClick={openShoppingCart}>
                            <AiOutlineShoppingCart className='right_icons' />
                            {cart.length !== 0 && <p className='number'>{cart.length}</p>}
                        </div>
                    </div>
                    {!isLoggedIn ?
                        <button className="login" onClick={() => navigate("/login")}>
                            <BsFillPersonFill className='right_icons' />
                            <p>Login</p>
                        </button> : <button className='login2' onClick={handleLogout}>
                            Logout
                        </button>
                    }
                </div>
            </div>
        </>
    )
}
