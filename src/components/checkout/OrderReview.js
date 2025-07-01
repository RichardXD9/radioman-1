import React from 'react';

const OrderReview = ({ formData, cartItems }) => {
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            return total + (isNaN(price) ? 0 : price);
        }, 0).toFixed(2);
    };

    return (
        <div>
            <h3 className="section-title">Revisão da Encomenda</h3>
            <div className="review-section">
                <h4>Endereço de Entrega</h4>
                <p>{formData.name}</p>
                <p>{formData.email}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.postalCode}</p>
            </div>
            <div className="review-section">
                <h4>Itens</h4>
                {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.title} className="item-image" />
                        <div className="item-details">
                            <span className="item-title">{item.title}</span>
                        </div>
                        <span className="item-price">{item.price}</span>
                    </div>
                ))}
            </div>
             <div className="order-totals">
                <div className="total-line total-final">
                    <span>Total</span>
                    <span>{calculateSubtotal()} €</span>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;

