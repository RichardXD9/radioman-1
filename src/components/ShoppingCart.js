import React from 'react';

const ShoppingCart = ({ cartItems, onRemoveItem, onCheckout, onUpdateQuantity }) => {
    const calculateTotal = () => {
        const totalInCents = cartItems.reduce((total, item) => {
            // Defensively ensure price is a number before calculation.
            const price = Number(item.price) || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
        return (totalInCents / 100).toFixed(2);
    };

    const formatPrice = (priceInCents) => {
        // Defensively handle cases where price might not be a number.
        const price = Number(priceInCents);
        if (isNaN(price)) {
            return '0.00 €';
        }
        return `${(price / 100).toFixed(2)} €`;
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
                    <div key={item._id || index} className="cart-item">
                        <img 
                            src={item.image}
                            alt={item.name} 
                            className="cart-item-image" 
                        />
                        <div className="cart-item-details">
                            <span className="cart-item-title">{item.name}</span>
                            <span className="cart-item-price">{formatPrice(item.price)}</span>
                            <div className="cart-item-quantity">
                                <label htmlFor={`quantity-${index}`}>Qtd:</label>
                                <select
                                    id={`quantity-${index}`}
                                    value={item.quantity}
                                    onChange={(e) => onUpdateQuantity(index, parseInt(e.target.value, 10))}
                                    disabled={!item.stock || item.stock <= 0}
                                    className="quantity-dropdown"
                                >
                                    {/* Generate options from 1 to the available stock */}
                                    {Array.from({ length: item.stock }, (_, i) => i + 1).map(q => (
                                        <option key={q} value={q}>{q}</option>
                                    ))}
                                    {item.stock === 0 && <option value="0">0</option>}
                                </select>
                            </div>
                            <button 
                                onClick={() => handleRemoveItem(index)}
                                className="remove-item-btn"
                            >
                                Remover
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