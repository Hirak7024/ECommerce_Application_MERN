import React from 'react';
import Categories from '../../Components/Categories/Categories';
import Banner from '../../Components/Banner/Banner';
import BestSelling from '../../Components/BestSelling/BestSelling';
import "./home.scss";

export default function Home() {
    return (
        <div className='HomePage_Container'>
            <Banner />
            <Categories />
            <BestSelling />
        </div>
    )
}
