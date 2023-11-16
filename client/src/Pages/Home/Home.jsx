import React, { useEffect, useContext } from 'react';
import Categories from '../../Components/Categories/Categories';
import Banner from '../../Components/Banner/Banner';
import BestSelling from '../../Components/BestSelling/BestSelling';
import "./home.scss";
import { Context } from '../../Utils/Context';

export default function Home() {

    // const {fetchWishListedProducts,wishListedProducts} = useContext(Context);
    // useEffect(()=>{
    //     fetchWishListedProducts();
    //   },[])

    //   console.log("From Home.jsx: ",wishListedProducts);

    return (
        <div className='HomePage_Container'>
            <Banner />
            <Categories />
            <BestSelling />
        </div>
    )
}
