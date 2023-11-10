import React from 'react';
import Card from '../../Components/Card/Card';
import { Link} from 'react-router-dom';
import "./CategoryProduct.scss";

export default function CategoryProduct() {
    return (
        <div className='CategoryProduct_Container'>
            <h1>Category Heading</h1>
            <div className="ProductsContainer">
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card /></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
                <Link to={"/productPage/2"} className='card_To_Product_Link'><Card/></Link>
            </div>
        </div>
    )
}
