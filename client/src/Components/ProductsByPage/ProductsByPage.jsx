import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import "./ProductsByPage.scss";

const ProductsByPage = ({
    selectedCategory,
    minPrice,
    maxPrice }) => {
    //For Pagination
    const { pageNumber } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(pageNumber || 1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [minPrice, maxPrice, selectedCategory]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/api/products/getProducts?page=${page}&category=${selectedCategory === "all" ?"" : selectedCategory}`)

                setPages(res.data.pages);
                setPosts(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError("Some Error Occured");
            }
        }
        fetchPosts();
    }, [page, minPrice, maxPrice, selectedCategory])

    //   console.log(selectedCategory);
    //   console.log("MinPrice : ", minPrice);
    //   console.log("MaxPrice : ", maxPrice);

    return (
        <div className="app_container">
            <div className="productCards_Container">
                {loading ? (
                    <h3 className="loading_text">Loading...</h3>
                ) : error ? (
                    <h3 className="error_text">{error}</h3>
                ) : (
                    <>
                        <div className="paginated_products">
                            <div className="app_products">
                                {posts.map((post) => (
                                    <Link to={`/productPage/${post._id}`} className='card_To_Product_Link'>
                                        <Card key={post._id} post={post} />
                                        </Link>
                                ))}
                            </div>
                            <Pagination page={page} pages={pages} changePage={setPage} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductsByPage;