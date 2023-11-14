import React, { useEffect, useContext } from 'react';
import Categories from '../../Components/Categories/Categories';
import Banner from '../../Components/Banner/Banner';
import BestSelling from '../../Components/BestSelling/BestSelling';
import { Context } from '../../Utils/Context';
import {jwtDecode}  from 'jwt-decode';
import "./home.scss";

export default function Home() {
    const { userData, setUserData } = useContext(Context);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
            const decodedToken = jwtDecode (authToken);

            // Check if the token is still valid, you can add more validation as needed
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                // Token is expired, clear user data
                localStorage.removeItem("authToken");
                setUserData(null);
            } else {
                // Token is still valid, update user data
                setUserData({ user: decodedToken, token: authToken });
            }
        }
    }, [setUserData]);
    return (
        <div className='HomePage_Container'>
            <Banner />
            <Categories />
            <BestSelling />
        </div>
    )
}
