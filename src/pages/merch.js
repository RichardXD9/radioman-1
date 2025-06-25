import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Filter from '../components/Filter';
import MerchProductList from '../components/MerchProductList';

const Merch = () => {
    const [filters, setFilters] = useState({
        genres: [],
        colors: [],
        availability: []
    });

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Retrieve cart items from local storage when component mounts
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(storedCartItems);
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleAddToCart = (product) => {
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Filter onFilterChange={handleFilterChange} />
                <MerchProductList 
                    filters={filters} 
                    onAddToCart={handleAddToCart} 
                />
            </div>
        </div>
    );
};

export default Merch;