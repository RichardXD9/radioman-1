import React from 'react';

const ShoppingCart = ({ cartItems }) => {
    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.title} - {item.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShoppingCart;


