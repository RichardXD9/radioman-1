import React from 'react';

const OrderReview = ({ formData, cartItems }) => {
  const calculateTotal = () => {
    const totalInCents = cartItems.reduce((total, item) => {
      // CORRECT WAY: Price is a number in cents.
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return total + (price * quantity);
    }, 0);
    return (totalInCents / 100).toFixed(2);
  };

  const formatPrice = (priceInCents) => {
    const price = Number(priceInCents);
    if (isNaN(price)) {
      return '0.00 €';
    }
    return `${(price / 100).toFixed(2)} €`;
  };

    return (
        <div>
            <h3 className="section-title">Revisão da Encomenda</h3>
            <div className="order-summary">
                <div className="summary-section">
                    <h4>Enviar para:</h4>
                    <p>{formData.name}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.postalCode}</p>
                    <p>{formData.email}</p>
                </div>
                <div className="summary-section">
                    <h4>Itens:</h4>
                    {cartItems.map((item) => (
                        <div key={item._id} className="summary-item">
                            <span>{item.quantity} x {item.name}</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <div className="summary-total">
                        <strong>Total:</strong>
                        <strong>{calculateTotal()} €</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;

