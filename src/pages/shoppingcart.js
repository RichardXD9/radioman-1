import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ShoppingCart from '../components/ShoppingCart';
import '../styles/shopping.css'; // Make sure to import the CSS

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage when component mounts
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <div>
      <Navbar />
      <div className="shopping-cart-container">
        <h1 className="shopping-cart-title">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ShoppingCart 
            cartItems={cartItems} 
            onRemoveItem={removeFromCart} 
          />
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
