import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ShoppingCart from '../components/ShoppingCart';
import '../styles/shopping.css'; // Make sure to import the CSS
import { Bokor } from 'next/font/google';

const bokorFont = Bokor({
  subsets: ["latin"],
  weight:"400",
});

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

    {/* Container separado para o título */}
    <div className="shopping-cart-header">
      <h1 style={{ fontFamily: "'Bokor', cursive" }} className="shopping-cart-title">
        Carrinho
      </h1>   
    </div>

    {/* Container para os itens do carrinho */}
    <div className="shopping-cart-container">
      {cartItems.length > 0 ? (
        <ShoppingCart 
          cartItems={cartItems} 
          onRemoveItem={removeFromCart} 
        />
      ) : (
        <p className="empty-cart-message">O Teu carrinho está vazio.</p>
      )}
    </div>
  </div>
);
};

export default ShoppingCartPage;
