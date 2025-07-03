import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import ShoppingCart from '../components/ShoppingCart';
import { Bokor } from 'next/font/google';

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve cart items from local storage when component mounts
    const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Sanitize cart items to prevent errors from old/invalid data in localStorage.
    // This ensures every item has a valid, numeric price and removes invalid items.
    const sanitizedCart = storedCart.map(item => ({
      ...item,
      price: Number(item.price) || 0, // Ensure price is a number, default to 0 if invalid.
      quantity: Number(item.quantity) || 1, // Ensure quantity is valid.
    })).filter(item => item.price > 0 && item._id); // Remove any items that are completely invalid.

    // If sanitization changed the cart, update localStorage to fix it for the future.
    if (sanitizedCart.length !== storedCart.length) {
      console.warn('Sanitized cart, removed invalid items.', { original: storedCart, sanitized: sanitizedCart });
      localStorage.setItem('cartItems', JSON.stringify(sanitizedCart));
      window.dispatchEvent(new Event('cartUpdated')); // Update navbar count
    }

    setCartItems(sanitizedCart);
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateCartItemQuantity = (indexToUpdate, newQuantity) => {
    const updatedCartItems = [...cartItems];
    const item = updatedCartItems[indexToUpdate];

    if (newQuantity > 0 && newQuantity <= item.stock) {
      item.quantity = newQuantity;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const handleCheckout = () => {
    // Simulate checkout process
    setCheckoutComplete(true);
    
    // Pass cart items to checkout page before clearing
    router.push({
      pathname: '/checkout',
      query: { cartItems: JSON.stringify(cartItems) },
    });

    // Update cart count
    window.dispatchEvent(new Event('cartUpdated'));
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

      {/* Container para os itens do carrinho ou mensagem de finalização */}
      <div className="shopping-cart-container">
        {checkoutComplete ? (
          <div className="checkout-success">
            <h2 className={bokorFont.className}>Serás redirecionado para uma nova página</h2>
          </div>
        ) : cartItems.length > 0 ? (
          <ShoppingCart 
            cartItems={cartItems} 
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartItemQuantity}
            onCheckout={handleCheckout}
          />
        ) : (
          <p className="empty-cart-message">O Teu carrinho está vazio.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;