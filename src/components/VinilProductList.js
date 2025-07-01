// src/components/VinilProductList.js
import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card';
import {Bokor} from 'next/font/google';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const VinilProductList = ({ filters = { genres: [], colors: [], availability: [] }, onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const queryParams = new URLSearchParams();
                if (filters.genres.length > 0) {
                    filters.genres.forEach(genre => queryParams.append('genres', genre));
                }
                if (filters.colors.length > 0) {
                    filters.colors.forEach(color => queryParams.append('colors', color));
                }
                if (filters.availability.length > 0) {
                    filters.availability.forEach(status => queryParams.append('availability', status));
                }
                queryParams.append('type', 'vinyl'); // Specify product type for this list

                const response = await fetch(`/api/products?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.success) {
                    setProducts(data.data);
                } else {
                    setError(data.error || 'Failed to fetch products');
                }
            } catch (err) {
                setError(err.message || 'An unexpected error occurred while fetching products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]); // Re-fetch products when filters change

    const handleBuyClick = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = [...cartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        window.dispatchEvent(new Event('cartUpdated'));
        
        if (onAddToCart) {
            onAddToCart(product);
        }
        
        alert(`Produto ${product.title} adicionado ao carrinho!`);
    };

    return (
        <div className="product-list ml-64">
            {loading ? (
                <p>Loading Vinyls...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : products.length === 0 ? (
                <p>No vinyl products found matching your criteria.</p>
            ) : (
                products.map((product) => (
                    <Card
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        availability={product.availability}
                        description={product.description}
                        price={product.price}
                        onBuyClick={() => handleBuyClick(product)}
                        bokorFont={bokorFont}
                        productType="vinyl"
                    />
                ))
            )}
        </div>
    );
};

export default VinilProductList;