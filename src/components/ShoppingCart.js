// components/ShoppingCart.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkoutComplete, setCheckoutComplete] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
        country: 'Portugal'
    });
    const router = useRouter();
    const { isLoaded, userId } = useAuth();

    // Fetch cart items when component mounts
    useEffect(() => {
        if (!isLoaded || !userId) {
            return;
        }
        
        const fetchCart = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/cart');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch cart');
                }
                
                const data = await response.json();
                
                // Format cart items to match component expectations
                const formattedItems = data.data.items.map(item => ({
                    id: item.productId._id,
                    image: item.productId.image,
                    title: item.productId.title,
                    description: item.productId.description,
                    price: item.productId.price,
                    quantity: item.quantity
                }));
                
                setCartItems(formattedItems);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCart();
    }, [isLoaded, userId]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Remove the € symbol and parse the price
            const price = parseFloat(item.price.replace(' €', ''));
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    const handleRemoveItem = async (productId) => {
        try {
            const response = await fetch('/api/cart/item', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to remove item');
            }
            
            // Update local state
            setCartItems(cartItems.filter(item => item.id !== productId));
            
            // Update cart UI
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Error removing item from cart');
        }   
    }
};