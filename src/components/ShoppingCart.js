import React from 'react';
import { useRouter } from 'next/router';

const ShoppingCart = ({ cartItems, onRemoveItem, onCheckout }) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Remove the € symbol and parse the price
            const price = parseFloat(item.price.replace(' €', ''));
            return total + price;
        }, 0).toFixed(2);
    };

    const handleRemoveItem = (index) => {
        onRemoveItem(index);
        // Dispatch custom event to update cart count
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <div className="shopping-cart">
            <div className="cart-items-container">
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="cart-item-image" 
                        />
                        <div className="cart-item-details">
                            <span className="cart-item-title">{item.title}</span>
                            <span className="cart-item-price">{item.price}</span>
                            <button 
                                onClick={() => handleRemoveItem(index)}
                                className="remove-item-btn"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">{calculateTotal()}€</span>
            </div>
            
            {cartItems.length > 0 && (
                <div className="checkout-container">
                    <button 
                        className="checkout-btn"
                        onClick={onCheckout}
                    >
                        Finalizar Compra
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;