import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import ProductList from '../components/ProductList';

const Home = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Retrieve cart items from local storage when component mounts
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(storedCartItems);
    }, []);

    const handleAddToCart = (product) => {
        const updatedCartItems = [...cartItems, product];
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <div>
            <Navbar /> 
            <ProductList onAddToCart={handleAddToCart} />
        </div>
    );
};

export default Home;