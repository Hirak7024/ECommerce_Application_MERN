import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../Components/Card/Card';
import { Context } from '../../Utils/Context';
import axios from "axios";
import "./WishListPage.scss";

export default function WishListPage() {
  const { userData } = useContext(Context);
  // const [wishListedProducts, setWishListedProducts] = useState([]);
  const {wishListedProducts, setWishListedProducts} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchWishListedProducts = async () => {
    setLoading(true);
    try {
      const userID = userData.userResponse._id;
      const response = await axios.post("/api/users/getProducts/wishlisted", { userId: userID });
      setLoading(false);
      setWishListedProducts(response.data.wishlistedProducts);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Some Error Occured");
    }
  };

  useEffect(() => {
    fetchWishListedProducts();
  }, []);

  console.log(wishListedProducts);

  return (
    <div className='WishListPage_Container'>
      <h1 className='wishListedProductsHeading'>WishListed Products</h1>
      {loading ? (<h3 className="loading_text">Loading...</h3>) :
        error ? (<h3 className="error_text">{error}</h3>) :
          (
            <>
              <div className="wishListedProducts_Container">
                {
                  wishListedProducts.length !== 0 ? (<>
                    {wishListedProducts?.map((item) => (
                      <Link to={`/productPage/${item._id}`} key={item._id} className='card_To_Product_Link'>
                        <Card key={item._id} post={item} />
                      </Link>
                    ))}
                  </>) : (
                    <h1 className='noProducts_head'>No Products available</h1>
                  )
                }
              </div>
            </>
          )
      }
    </div>
  );
}
