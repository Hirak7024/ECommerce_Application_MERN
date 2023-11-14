import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProductsByPage from '../../Components/ProductsByPage/ProductsByPage';
import { Context } from '../../Utils/Context';
import "./CategoryProduct.scss";

export default function CategoryProduct() {
    // const {pageNumber} = useParams();
    // const [selectedCategory, setSelectedCategory] = useState(Category);
    const {selectedCategory, setSelectedCategory} = useContext(Context);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [minPrice, setMinPrice] = useState(1000);
    const [maxPrice, setMaxPrice] = useState(1000000);

    const location = useLocation();

    useEffect(() => {
        if (selectedPriceRange === null) {
            setMinPrice(1000);
            setMaxPrice(1000000);
        } 
    }, [selectedPriceRange]);

    const handleSelectedCategory = (event) => {
        setSelectedCategory(event.target.value);
    }

    const handleSelectedPriceRange = (value) => {
        if (selectedPriceRange === value) {
            setSelectedPriceRange(null);
        } else {
            setSelectedPriceRange(value);
        }
    };

    return (
        <div className='CategoryProduct_Container'>
            <div className="left">
                <div className='sidebar_categories'>
                    <h1 className='select_categories_heading'>Select Categories</h1>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            checked={selectedCategory === "all"}
                            name="category"
                            value="all"
                            onChange={handleSelectedCategory}
                        />
                        <span className="checkmark">All</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            checked={selectedCategory === "laptops"}
                            name="category"
                            value="laptops"
                            onChange={handleSelectedCategory}
                        />
                        <span className="checkmark">Laptops</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            checked={selectedCategory === "smartphones"}
                            name="category"
                            value="smartphones"
                            onChange={handleSelectedCategory}
                        />
                        <span className="checkmark">Smartphones</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            checked={selectedCategory === "headphones"}
                            name="category"
                            value="headphones"
                            onChange={handleSelectedCategory}
                        />
                        <span className="checkmark">Headphones</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            checked={selectedCategory === "speakers"}
                            name="category"
                            value="speakers"
                            onChange={handleSelectedCategory}
                        />
                        <span className="checkmark">Speakers</span>
                    </label>
                </div>
                <div className="sidebar_categories">
                    <h1 className="select_categories_heading">Select Price Range</h1>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            name="price_range"
                            checked={selectedPriceRange === "Under &#8377;10,000"}
                            value="Under &#8377;10,000"
                            onClick={() => { handleSelectedPriceRange("Under &#8377;10,000") }} //By wrapping the handleSelectedPriceRange function call inside an arrow function in the onClick handler, you ensure that it's only called when the radio button is clicked, not during rendering. Otherwise there will be an infinite call
                            onChange={() => {
                                setMinPrice(1000);
                                setMaxPrice(10000);
                            }}
                        />
                        <span className="checkmark">Under &#8377;10,000</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            name="price_range"
                            checked={selectedPriceRange === "&#8377;10,000 - &#8377;20,000"}
                            value="&#8377;10,000 - &#8377;20,000"
                            onClick={() => { handleSelectedPriceRange("&#8377;10,000 - &#8377;20,000") }}
                            onChange={() => {
                                setMinPrice(10000);
                                setMaxPrice(20000);
                            }}
                        />
                        <span className="checkmark">&#8377;10,000 - &#8377;20,000</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            name="price_range"
                            checked={selectedPriceRange === "&#8377;20,000 - &#8377;30,000"}
                            value="&#8377;20,000 - &#8377;30,000"
                            onClick={() => { handleSelectedPriceRange("&#8377;20,000 - &#8377;30,000") }}
                            onChange={() => {
                                setMinPrice(20000);
                                setMaxPrice(30000);
                            }}
                        />
                        <span className="checkmark">&#8377;20,000 - &#8377;30,000</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            name="price_range"
                            checked={selectedPriceRange === "&#8377;30,000 - &#8377;40,000"}
                            value="&#8377;30,000 - &#8377;40,000"
                            onClick={() => { handleSelectedPriceRange("&#8377;30,000 - &#8377;40,000") }}
                            onChange={() => {
                                setMinPrice(30000);
                                setMaxPrice(40000);
                            }}
                        />
                        <span className="checkmark">&#8377;30,000 - &#8377;40,000</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            name="price_range"
                            checked={selectedPriceRange === "&#8377;40,000 - &#8377;50,000"}
                            value="&#8377;40,000 - &#8377;50,000"
                            onClick={() => { handleSelectedPriceRange("&#8377;40,000 - &#8377;50,000") }}
                            onChange={() => {
                                setMinPrice(40000);
                                setMaxPrice(50000);
                            }}
                        />
                        <span className="checkmark">&#8377;40,000 - &#8377;50,000</span>
                    </label>
                    <label className='sidebar_label'>
                        <input className='sidebar_input'
                            type="radio"
                            name="price_range"
                            checked={selectedPriceRange === "Above &#8377;50,000"}
                            value="Above &#8377;50,000"
                            onClick={() => { handleSelectedPriceRange("Above &#8377;50,000") }}
                            onChange={() => {
                                setMinPrice(50000);
                                setMaxPrice(100000)
                            }}
                        />
                        <span className="checkmark">Above &#8377;50,000</span>
                    </label>
                </div>
            </div>
            <div className="right">
                <h1 className='heading'>{selectedCategory && selectedCategory.toUpperCase()}</h1>
                <div className="ProductsContainer">
                    <ProductsByPage 
                    selectedCategory={selectedCategory}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    // pageNumber={pageNumber}
                     />
                </div>
            </div>
        </div>
    )
}
