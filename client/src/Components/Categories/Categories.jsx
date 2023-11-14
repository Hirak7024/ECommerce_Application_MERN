import React, { useContext } from 'react';
import Laptop from "../../Assests/Laptop2.jpg";
import Smartphone from "../../Assests/Smartphone2.jpg";
import HeadPhone from "../../Assests/Headphone2.jpg";
import Speaker from "../../Assests/Speaker2.jpg";
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Utils/Context';
import "./categories.scss";

export default function Categories() {
    const navigate = useNavigate();
    const { setSelectedCategory, pageNumber } = useContext(Context);
    return (
        <>
            <div className="categories-container">
                <h1>Shop By Categories</h1>
                <div className="img-container">
                    <div className="img-container-items" onClick={() => {
                        setSelectedCategory("laptops");
                        navigate(`/categoryProduct/:pageNumber`);
                    }}>
                        <img src={Laptop} alt="" />
                        <p>Laptops</p>
                    </div>
                    <div className="img-container-items" onClick={() => {
                        setSelectedCategory("smartphones");
                        navigate(`/categoryProduct/:pageNumber`);
                    }}>
                        <img src={Smartphone} alt="" />
                        <p>Smartphones</p>
                    </div>
                    <div className="img-container-items" onClick={() => {
                        setSelectedCategory("headphones");
                        navigate(`/categoryProduct/:pageNumber`);
                    }}>
                        <img src={HeadPhone} alt="" />
                        <p>Headphones</p>
                    </div>
                    <div className="img-container-items" onClick={() => {
                        setSelectedCategory("speakers");
                        navigate(`/categoryProduct/:pageNumber`);
                    }}>
                        <img src={Speaker} alt="" />
                        <p>Speakers</p>
                    </div>
                </div>
            </div>
        </>
    )
}
