// src/pages/product/[type]/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
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
        if (!id) return; // Don't fetch if id is not available yet

        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                // CORRECTED: Fetch product details from the correct API endpoint
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.success) {
                    setProduct(data.data);
                } else {
                    setError(data.error || 'Failed to fetch product details.');
                }
            } catch (err) {
                setError(err.message || 'An unexpected error occurred while fetching product details.');
            } finally {
                setLoading(false);
            }
        };
 
        fetchProduct();
    }, [id]); // Re-fetch only when id changes
 
    // CORRECTED: handleBuyClick with quantity and stock check
    const handleBuyClick = () => {
        if (!product) return;

        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const existingItemIndex = cartItems.findIndex(item => item._id === product._id);

        if (existingItemIndex > -1) {
            const existingItem = cartItems[existingItemIndex];
            if (existingItem.quantity < product.stock) {
                cartItems[existingItemIndex].quantity++;
            } else {
                alert(`Não é possível adicionar mais. Apenas ${product.stock} em stock.`);
                return;
            }
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        window.dispatchEvent(new Event('cartUpdated'));
        alert(`Produto ${product.name} adicionado ao carrinho!`);
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

    const formatPrice = (priceInCents) => {
        const price = Number(priceInCents);
        if (isNaN(price)) return 'N/A';
        return `${(price / 100).toFixed(2)} €`;
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl text-white">Loading product details...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl text-red-500">Error: {error}</div>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl text-white">Product not found</div>
                </div>
            </Layout>
        );
    }

    const isAvailable = product.stock > 0;

    return (
        <Layout>
            <div className="product-detail-page">
            <div className="container mx-auto px-4 product-detail-container">
                <button
                    onClick={handleBackClick}
                    className="back-button"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Voltar para {type === 'vinyl' ? 'Vinil' : type === 'cd' ? 'CDs' : 'Merchandise'}</span>
                </button>
                
                <div className="product-grid">
                    <div className="product-image-wrapper">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-image"
                        />
                    </div>

                    <div className="product-info">
                        <div className="product-info-header">
                            <h1 className={`product-title ${bokorFont.className}`}>
                                {product.name}
                            </h1>

                            {/* Display availability based on quantity */}
                            <div className="flex items-center">
                                <span className={`availability-badge ${isAvailable ? 'available' : 'unavailable'}`}>
                                    {isAvailable ? 'Disponível' : 'Esgotado'}
                                </span>
                            </div>

                            <p className="product-price">{formatPrice(product.price)}</p>
                        </div>

                        <div>
                            <h3 className="product-section-title">Description</h3>
                            <p className="product-description">{product.description}</p>
                        </div>

                        <button
                            onClick={handleBuyClick}
                            disabled={!isAvailable}
                            className="buy-button-detail"
                        >
                            <ShoppingCartIcon />
                            <span>
                                {isAvailable
                                    ? 'Add to Cart' 
                                    : 'Out of Stock'
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default ProductDetail;