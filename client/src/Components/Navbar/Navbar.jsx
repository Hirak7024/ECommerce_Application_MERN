import React, { useContext, useState,useEffect } from 'react';
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { Context } from '../../Utils/Context';
import { useNavigate } from 'react-router-dom';
import "./navbar.scss";

export default function Navbar() {
    const [isLogged, setIsLogged] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const handleClick = () => {
        setIsLogged(!isLogged);
    }
    const { setShowCart } = useContext(Context);
    const navigate = useNavigate();

    const handleScroll = () => {
        const offset = window.scrollY;  //it counts by how many pixels the screen is getting scrolled in y direction
        if (offset > 200) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])
    return (
        <>
            <div className={ `navbar-container ${scrolled ? "sticky_navbar" : ""}`}>
                <div className="left">
                    <h1 onClick={()=>navigate("/")}> E Store</h1>
                </div>
                <div className="middle">
                    <div className="searchBox">
                        <input type="text" placeholder='Search' />
                        <AiOutlineSearch className='searchIcon' />
                    </div>
                </div>
                <div className="right">
                    <div className='icons'>
                        <div className='icon' onClick={()=>navigate("/wishlistPage/3")} ><AiOutlineHeart size={30} /></div>
                        <div className='icon' onClick={()=>setShowCart(true)}>
                            <AiOutlineShoppingCart size={30} />
                            <p className='number'>3</p>
                        </div>
                    </div>
                    {/* {!isLogged ?
                        <button className="login" onClick={handleClick}>
                            <BsFillPersonFill size={22} />
                            <p>Login</p>
                        </button> : <button className='login2' onClick={handleClick}>
                            Logout
                        </button>
                    } */}
                    <button className="login" onClick={()=>navigate("/login")}>
                            <BsFillPersonFill size={22} />
                            <p>Login</p>
                        </button> 
                </div>
            </div>
        </>
    )
}
