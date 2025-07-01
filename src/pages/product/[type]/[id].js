// src/pages/product/[type]/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import { Bokor } from 'next/font/google';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight: "400",
});

const ProductDetail = () => {
    const router = useRouter();
    const { id, type } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id || !type) return; // Don't fetch if id or type are not available yet

            setLoading(true);
            setError(null);
            try {
                // Fetch product details from your new API endpoint
                const response = await fetch(`/api/products/${type}/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.success) {
                    setProduct(data.data);
                } else {
                    setError(data.error || 'Failed to fetch product details');
                }
            } catch (err) {
                setError(err.message || 'An unexpected error occurred while fetching product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, type]); // Re-fetch when id or type changes in the URL

    const handleBuyClick = () => {
        if (!product) return;

        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = [...cartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        window.dispatchEvent(new Event('cartUpdated'));
        
        alert(`Produto ${product.title} adicionado ao carrinho!`);
    };

    const handleBackClick = () => {
        switch(type) {
            case 'vinyl':
                router.push('/vinil');
                break;
            case 'cd':
                router.push('/cd');
                break;
            case 'merch':
                router.push('/merch');
                break;
            default:
                router.push('/');
        }
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl text-white">Loading product details...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl text-white">Product not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <Navbar />
            <div className="container mx-auto px-4 product-detail-container">
                <button
                    onClick={handleBackClick}
                    className="back-button"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Back to {type === 'vinyl' ? 'Vinyl' : type === 'cd' ? 'CDs' : 'Merchandise'}</span>
                </button>
                
                <div className="product-grid">
                    <div className="product-image-wrapper">
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="product-image"
                        />
                    </div>

                    <div className="product-info">
                        <div className="product-info-header">
                            <h1 className={`product-title ${bokorFont.className}`}>
                                {product.title}
                            </h1>

                            {/* Display availability based on quantity */}
                            <div className="flex items-center">
                                <span className={`availability-badge ${product.availability === 'Disponível' ? 'available' : 'unavailable'}`}>
                                    {product.availability}
                                </span>
                            </div>

                            <p className="product-price">{product.price}</p>
                        </div>

                        <div>
                            <h3 className="product-section-title">Description</h3>
                            <p className="product-description">{product.fullDescription}</p>
                        </div>

                        {product.specifications && (
                            <div>
                                <h3 className="product-section-title">Specifications</h3>
                                <ul className="specifications-list">
                                    {product.specifications.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handleBuyClick}
                            disabled={product.availability !== 'Disponível'} // Disable if not available
                            className="buy-button-detail"
                        >
                            <ShoppingCartIcon />
                            <span>
                                {product.availability === 'Disponível'
                                    ? 'Add to Cart' 
                                    : 'Out of Stock'
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;