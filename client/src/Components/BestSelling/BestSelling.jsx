import React, { useState, useEffect } from 'react';
import Card from "../Card/Card"
import { Link } from 'react-router-dom';
import axios from "axios";
import "./BestSelling.scss";

export default function BestSelling() {
    const [bestSellingProducts, setBestSellingProducts] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchBestSellingProducts = async (req, res) => {
            setLoading(true);
            try {
                const response = await axios.get("/api/products/products/bestSelling")

                setBestSellingProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError("Some Error Occured");
            }
        }
        fetchBestSellingProducts();
    }, [])
    return (
        <div className='BestSelling_Container'>
            <h1 className='bestSelling_Heading'>Best Selling Products</h1>
            <div className="card_Container">
                {loading ? (<h1 className="loading_text">Loading ...</h1>) : error ? 
                (<h1 className='error_text'>Some Error Occured ...</h1>) : 
                <div className='bestSelling_Container'>
                    {bestSellingProducts?.map((item) => (
                        <Link to={`/productPage/${item._id}`} key={item._id} className='card_To_Product_Link'>
                            <Card key={item._id} post={item} />
                        </Link>
                    ))}
                </div>
                }

            </div>
        </div>
    )
}
