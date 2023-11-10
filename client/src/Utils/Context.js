import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const Context = createContext();

const AppContext = ({ children }) => {  
   const [showCart, setShowCart] = useState(false);  
   const [isCartEmpty, setIsCartEmpty] = useState(false);
   const [productLiked, setProductLiked] = useState(false);
   const [addedToCart, setAddedToCart] = useState(false);
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
        }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext;