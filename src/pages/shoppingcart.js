import React, { useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';


const ShoppingCartPage = ({ cartItems = [] }) => {

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
      <ShoppingCart cartItems={cartItems} />
    ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCartPage;

