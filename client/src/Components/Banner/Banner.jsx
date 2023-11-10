import React from 'react'
import BannerLaptop from "../../Assests/Laptop_Banner1.png";
import Banner_Smartphone from "../../Assests/Smartphone_Banner1.png";
import Banner_Headphone from "../../Assests/Headphone_Banner1.png";
import "./Banner.scss";

export default function Banner() {
  return (
    <div className='Banner_Container'>
      <div className="left">
            <h1>SALE</h1>
            <h2>Get Upto 40% OFF</h2>
            <h3>On Laptops, Smartphones, Tablets and Speakers</h3>
      </div>
      <div className="right">
            <img src={Banner_Smartphone} id='img1' alt="" />
            <img src={BannerLaptop} id='img2' alt="" />
            <img src={Banner_Headphone} id='img3' alt="" />
      </div>
    </div>
  )
}
