// src/components/ProductList.js
import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card';
import Filter from './Filter'; // Keep Filter if it's external or needed for other pages
import { Bokor } from 'next/font/google';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const ProductList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        genres: [],
        colors: [],
        availability: []
    });

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // Construct query parameters from filters
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
        // Add to cart and save to local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = [...cartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        
        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Call the onAddToCart prop if provided
        if (onAddToCart) {
            onAddToCart(product);
        }
        
        // Optional: Show a confirmation
        alert(`Produto ${product.title} adicionado ao carrinho!`);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (loading) {
        return <div className="product-list ml-64">Loading products...</div>;
    }

    if (error) {
        return <div className="product-list ml-64 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex">
            <Filter onFilterChange={handleFilterChange} />
            <div className="product-list ml-64">
                {products.length === 0 ? (
                    <p>No products found matching your criteria.</p>
                ) : (
                    products.map((product) => (
                        <Card
                            key={product.id} // Use product.id directly from fetched data
                            id={product.id}
                            image={product.image}
                            title={product.title}
                            availability={product.quantity > 0 ? 'Disponível' : 'Esgotado'} // Use quantity from backend
                            description={product.description}
                            price={product.price}
                            onBuyClick={() => handleBuyClick(product)} 
                            bokorFont={bokorFont}
                            productType="vinyl" // Ensure this matches what you expect in the backend query
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;