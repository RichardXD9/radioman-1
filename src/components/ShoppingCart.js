import React from 'react';

const ShoppingCart = ({ cartItems, onRemoveItem, onCheckout, onUpdateQuantity }) => {
    const calculateTotal = () => {
        const totalInCents = cartItems.reduce((total, item) => {
            // Defensively ensure price is a number before calculation.
            const price = Number(item.price) || 0;
            const quantity = item.quantity || 1;
            return total + (price * quantity);
        }, 0);
        // Changed toFixed(2) to directly apply to the cents value
        // The formatPrice function expects price in cents if you want to use it
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
        // === This is now the .cart-main-layout flex container ===
        <div className="cart-main-layout"> {/* Changed from cart-layout-container */}

            {/* The main shopping cart items box (left column) */}
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
                                        {Array.from({ length: item.stock || 5 }, (_, i) => i + 1).map(q => ( // Added fallback for item.stock
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
            </div> {/* End of .shopping-cart */}

            {/* === This is the .cart-summary-sidebar (right column) === */}
            {/* It will now render alongside .shopping-cart if cartItems exist */}
            {cartItems.length > 0 && (
                <div className="cart-summary-sidebar"> {/* Changed from cart-summary-box */}
                    <div className="cart-total">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">{calculateTotal()}€</span>
                    </div>

                    {/* Added checkout-button-wrapper for correct styling and centering */}
                    <div className="checkout-button-wrapper">
                        <button
                            className="checkout-btn"
                            onClick={onCheckout}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}

        </div> // === END .cart-main-layout ===
    );
};

export default ShoppingCart;