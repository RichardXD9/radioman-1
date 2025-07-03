import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Bokor } from 'next/font/google';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight: "400",
});

const OrderCompletePage = () => {
    useEffect(() => {
        // Clear the cart from local storage upon successful order completion
        localStorage.setItem('cartItems', JSON.stringify([]));
        // Dispatch a custom event to update the cart count in the navbar
        window.dispatchEvent(new Event('cartUpdated'));
    }, []);

    return (
        <Layout>
            <div className="checkout-container">
                <div className="order-complete">
                    <div className="success-icon">
                        <CheckCircleIcon />
                    </div>
                    <h2 className={bokorFont.className}>Pagamento Efetuado!</h2>
                    <p>Obrigado pela sua encomenda. Recebemos o seu pagamento e estamos a processar a sua encomenda.</p>
                    <Link href="/" className="btn-primary">
                        Continuar a Comprar
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default OrderCompletePage;
