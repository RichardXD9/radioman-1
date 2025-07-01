// src/pages/index.js
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import ProductList from '../components/ProductList'; // Assuming ProductList will now fetch its own data

const Home = () => {
    // Keep cartItems state and logic if Navbar or other components still need it locally
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(storedCartItems);
    }, []);

    // handleAddToCart can remain here or be passed down if ProductList still needs to update global cart state
    const handleAddToCart = (product) => {
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <div>
            <Navbar /> 
            {/* ProductList now handles its own data fetching based on its internal filters */}
            <ProductList onAddToCart={handleAddToCart} />
        </div>
    );
};

export default Home;