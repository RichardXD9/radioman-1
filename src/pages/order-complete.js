import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderCompletePage = () => {
    useEffect(() => {
        // Clear the cart from local storage upon successful order completion
        localStorage.setItem('cartItems', JSON.stringify([]));
        // Dispatch a custom event to update the cart count in the navbar
        window.dispatchEvent(new Event('cartUpdated'));
    }, []);

    return (
        <div className="product-detail-page">
            <Navbar />
            <div className="product-detail-container text-center flex flex-col items-center">
                <CheckCircleIcon className="h-24 w-24 text-green-500 mb-4" />
                <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
                <p className="text-lg text-gray-300 mb-8">Thank you for your order. We've received your payment and are processing your order.</p>
                <Link href="/" className="back-button">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderCompletePage;
