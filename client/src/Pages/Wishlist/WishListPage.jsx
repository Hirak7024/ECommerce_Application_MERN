import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import "./WishListPage.scss"

export default function WishListPage() {
  return (
    <div className='WishListPage_Container'>
      <h1>WishListed Products</h1>
      <div className="wishListedProducts_Container">
        {/* <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link>
        <Link className='card_To_Product_Link' to={"/productPage/2"}><Card /></Link> */}
      </div>
    </div>
  )
}
