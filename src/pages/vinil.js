import React from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const Vinil = () => {
    const handleAddToCart = (product) => {
        console.log(`Product added from Vinil page: ${product.name}`);
    };

    return (
        <Layout>
            <ProductList productType="vinyl" onAddToCart={handleAddToCart} />
        </Layout>
    );
};

export default Vinil;