import React from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const Cd = () => {
    const handleAddToCart = (product) => {
        // The cart logic is now handled inside ProductList.
        // This handler is here for potential future use, like showing a notification.
        console.log(`Product added from CD page: ${product.name}`);
    };

    return (
        <Layout>
            <ProductList productType="cd" onAddToCart={handleAddToCart} />
        </Layout>
    );
};

export default Cd;