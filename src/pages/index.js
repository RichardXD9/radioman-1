// src/pages/index.js
import React from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const Home = () => {
    const handleAddToCart = (product) => {
        console.log(`Product added from Home page: ${product.name}`);
    };

    return (
        <Layout>
            <ProductList onAddToCart={handleAddToCart} />
        </Layout>
    );
};

export default Home;