import React from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const Merch = () => {
    const handleAddToCart = (product) => {
        console.log(`Product added from Merch page: ${product.name}`);
    };

    return (
        <Layout>
            <ProductList productType="merch" onAddToCart={handleAddToCart} />
        </Layout>
    );
};

export default Merch;