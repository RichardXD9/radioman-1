// src/components/ProductList.js
import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card';
import Filter from './Filter'; // Keep Filter if it's external or needed for other pages
import { Bokor } from 'next/font/google';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const ProductList = ({ onAddToCart, productType }) => {
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
                if (productType) {
                    queryParams.append('type', productType);
                }

                // FIX 1: Call the new, working API endpoint
                const response = await fetch(`/api/products/list?${queryParams.toString()}`);
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
    }, [filters, productType]); // Re-fetch products when filters or productType change

    const handleBuyClick = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const existingItemIndex = cartItems.findIndex(item => item._id === product._id);

        if (existingItemIndex > -1) {
            // Item already in cart, increment quantity if stock allows
            const existingItem = cartItems[existingItemIndex];
            if (existingItem.quantity < product.stock) {
                cartItems[existingItemIndex].quantity++;
            } else {
                alert(`Não é possível adicionar mais. Apenas ${product.stock} em stock.`);
                return; // Stop if max stock is reached
            }
        } else {
            // New item, add to cart with quantity of 1
            cartItems.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        window.dispatchEvent(new Event('cartUpdated'));
        
        if (onAddToCart) {
            onAddToCart(product);
        }
        
        alert(`Produto ${product.name} adicionado ao carrinho!`); // FIX 2: Use `name`
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
                            key={product._id} // FIX 3: Use `_id` from the database
                            id={product._id}
                            image={product.image}
                            name={product.name} // Use `name` prop for consistency
                            availability={product.stock > 0 ? 'Disponível' : 'Esgotado'} // FIX 5: Use `stock` from the database
                            description={product.description}
                            price={product.price}
                            onBuyClick={() => handleBuyClick(product)} 
                            bokorFont={bokorFont}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;