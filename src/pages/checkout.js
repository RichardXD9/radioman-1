import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Checkout from '../components/Checkout';


const checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for cart items in query parameters first
    if (router.query.cartItems) {
      try {
        const queryCartItems = JSON.parse(router.query.cartItems);
        if (Array.isArray(queryCartItems)) {
          setCartItems(queryCartItems);
        } else {
          setCartItems([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error parsing cart items from query:', error);
        // Fallback to localStorage if query parsing fails
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(storedCartItems);
        setIsLoading(false);
      }
    } else {
      // Fallback to localStorage if no query parameters
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(storedCartItems);
      setIsLoading(false);
    }

    // Redirect to shoppingcart only if no query params and cart is empty after loading
    if (!router.isReady || (!router.query.cartItems && cartItems.length === 0 && !isLoading)) {
      router.push('/shoppingcart');
    }
  }, [router.isReady, router.query.cartItems, cartItems, isLoading]);

  const handleOrderComplete = (orderData) => {
    console.log('Order completed:', orderData);
    // You can add additional logic here, like analytics tracking
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          color: '#fff'
        }}>
          A carregar...
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !router.query.cartItems) {
    return (
      <div>
        <Navbar />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          color: '#fff',
          fontSize: '1.2rem'
        }}>
          O seu carrinho está vazio. A redirecionar...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <Checkout 
        cartItems={cartItems} 
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};

export default checkout;