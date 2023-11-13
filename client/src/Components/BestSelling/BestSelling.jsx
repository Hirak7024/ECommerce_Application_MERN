import React from 'react';
import Card from "../Card/Card"
import { Link } from 'react-router-dom';
import "./BestSelling.scss";

export default function BestSelling() {
    return (
        <div className='BestSelling_Container'>
            <h1>Best Selling Produts</h1>
            <div className="card_Container">
                {/* <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link> */}
            </div>
        </div>
    )
}
