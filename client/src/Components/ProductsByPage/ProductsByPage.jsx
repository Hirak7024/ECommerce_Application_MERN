import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import axios from "axios";
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import { Link, useLocation } from 'react-router-dom';
import "./ProductsByPage.scss";
import { Context } from '../../Utils/Context';

const ProductsByPage = ({
    selectedCategory,
    minPrice,
    maxPrice }) => {

    // const { pageNumber, setPageNumber } = useContext(Context);
    const {pageNumber} = useParams();
    //For Pagination
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
                const res = await axios.get(`/api/products/getProducts?page=${page}&category=${selectedCategory === "all" ? "" : selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}`)

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
                                {posts.length !== 0 ? posts.map((post) => (
                                    <Link to={`/productPage/${post._id}`} key={post._id} className='card_To_Product_Link'>
                                        <Card key={post._id} post={post} />
                                    </Link>
                                )) :
                                    <>
                                        <h1 className="no_prouct">No Products Found !!!</h1>
                                    </>
                                }
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