// components/ProductList.js
import React, { useState, useEffect, useMemo } from 'react';
import Card from './Card';
import Filter from './Filter';
import { Bokor } from 'next/font/google';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight: "400",
});

const ProductList = ({ onAddToCart, productType = 'Vinil' }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { isLoaded, userId } = useAuth();

    const [filters, setFilters] = useState({
        genres: [],
        colors: [],
        availability: []
    });

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/products?type=${productType}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                
                const data = await response.json();
                setProducts(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [productType]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const genreMatch = filters.genres.length === 0 || 
                filters.genres.includes(product.genre);
            const colorMatch = filters.colors.length === 0 || 
                filters.colors.includes(product.color);
            const availabilityMatch = filters.availability.length === 0 || 
                filters.availability.includes(product.availability);
            
            return genreMatch && colorMatch && availabilityMatch;
        });
    }, [products, filters]);

    const handleBuyClick = async (product) => {
        if (!isLoaded || !userId) {
            // User not logged in, redirect to sign in
            alert('Por favor, faça login para adicionar produtos ao carrinho');
            router.push('/sign-in');
            return;
        }
        
        try {
            // Add to cart using API
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1
                }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error adding to cart');
            }
            
            // Dispatch custom event to update cart count
            window.dispatchEvent(new Event('cartUpdated'));
            
            // Call the onAddToCart prop if provided
            if (onAddToCart) {
                onAddToCart(product);
            }
            
            alert(`Produto ${product.title} adicionado ao carrinho!`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding product to cart');
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (loading) {
        return <div className="loading">A carregar produtos...</div>;
    }

    if (error) {
        return <div className="error">Erro: {error}</div>;
    }

    return (
        <div className="flex">
            <Filter onFilterChange={handleFilterChange} />
            <div className="product-list ml-64">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <Card
                        key={product._id}
                        image={product.image}
                        title={product.title}
                        availability={product.availability}
                        description={product.description}
                        price={product.price}
                        onBuyClick={() => handleBuyClick(product)}
                        bokorFont={bokorFont}
                    />
                )) : (
                    <p>Nenhum produto encontrado com os filtros selecionados.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;