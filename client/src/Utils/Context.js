import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const Context = createContext();

const AppContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [productLiked, setProductLiked] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [userData, setUserData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishListedProducts, setWishListedProducts] = useState([]);
    const [cartItems, setCartItems] = useState({
        product: null,
        productQuantity: null
    });
    const [cart, setCart] = useState([]);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            isCartEmpty,
            setIsCartEmpty,
            productLiked,
            setProductLiked,
            addedToCart,
            setAddedToCart,
            selectedCategory,
            setSelectedCategory,
            userData,
            setUserData,
            isLoggedIn,
            setIsLoggedIn,
            wishListedProducts,
            setWishListedProducts,
            cartItems,
            setCartItems,
            cart, 
            setCart,
        }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext;