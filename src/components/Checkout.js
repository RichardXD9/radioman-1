import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Bokor } from 'next/font/google';
import "../styles/Checkout.css";// Adjust path based on actual location

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

const Checkout = ({ cartItems, onOrderComplete }) => {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review, 4: Complete
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Shipping Information
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Portugal'
  });

  // Payment Information
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  // Shipping Options
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const shippingOptions = [
    { id: 'standard', name: 'Correios Standard', price: 3.50, days: '5-7 dias úteis' },
    { id: 'express', name: 'Correios Expresso', price: 7.00, days: '2-3 dias úteis' },
    { id: 'pickup', name: 'Recolha na Loja', price: 0, days: 'Disponível hoje' }
  ];

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(' €', ''));
      return total + price;
    }, 0);
  };

  const getShippingCost = () => {
    const option = shippingOptions.find(opt => opt.id === selectedShipping);
    return option ? option.price : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + getShippingCost();
  };

  // Form validation
  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'postalCode'];
    return required.every(field => shippingInfo[field].trim() !== '');
  };

  const validatePayment = () => {
    if (selectedShipping === 'pickup') return true; // No payment needed for pickup
    const required = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    return required.every(field => paymentInfo[field].trim() !== '');
  };

  // Handle form submissions
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (selectedShipping === 'pickup' || validatePayment()) {
      setStep(3);
    } else {
      alert('Por favor, preencha todos os campos do cartão.');
    }
  };

  const handleOrderSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const orderData = {
        id: Date.now().toString(),
        items: cartItems,
        shipping: shippingInfo,
        payment: selectedShipping === 'pickup' ? { method: 'pickup' } : paymentInfo,
        shippingOption: shippingOptions.find(opt => opt.id === selectedShipping),
        subtotal: calculateSubtotal(),
        shippingCost: getShippingCost(),
        total: calculateTotal(),
        status: 'confirmed',
        orderDate: new Date().toISOString()
      };

      // Save order to localStorage (in a real app, this would go to a database)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      localStorage.setItem('cartItems', JSON.stringify([]));
      window.dispatchEvent(new Event('cartUpdated'));

      setIsProcessing(false);
      setStep(4);
      
      if (onOrderComplete) {
        onOrderComplete(orderData);
      }

      // Redirect after 5 seconds
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }, 2000);
  };

  const renderShippingForm = () => (
    <div className="checkout-section">
      <h2 className={`section-title ${bokorFont.className}`}>Informações de Envio</h2>
      <form onSubmit={handleShippingSubmit} className="checkout-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              value={shippingInfo.firstName}
              onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Apelido *</label>
            <input
              type="text"
              value={shippingInfo.lastName}
              onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input
            type="tel"
            value={shippingInfo.phone}
            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Morada *</label>
          <input
            type="text"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cidade *</label>
            <input
              type="text"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Código Postal *</label>
            <input
              type="text"
              value={shippingInfo.postalCode}
              onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="shipping-options">
          <h3>Opções de Envio</h3>
          {shippingOptions.map(option => (
            <div key={option.id} className="shipping-option">
              <input
                type="radio"
                id={option.id}
                name="shipping"
                value={option.id}
                checked={selectedShipping === option.id}
                onChange={(e) => setSelectedShipping(e.target.value)}
              />
              <label htmlFor={option.id}>
                <div className="option-details">
                  <span className="option-name">{option.name}</span>
                  <span className="option-time">{option.days}</span>
                </div>
                <span className="option-price">
                  {option.price === 0 ? 'Grátis' : `${option.price.toFixed(2)}€`}
                </span>
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn-primary" disabled={isProcessing}>
          Continuar para Pagamento
        </button>
      </form>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="checkout-section">
      <h2 className={`section-title ${bokorFont.className}`}>
        {selectedShipping === 'pickup' ? 'Confirmação de Recolha' : 'Informações de Pagamento'}
      </h2>
      
      {selectedShipping === 'pickup' ? (
        <div className="text-white">
          <p>Selecionou recolha na loja. O pagamento será efetuado no momento da recolha.</p>
          <p><strong>Morada da Loja:</strong> Rua Exemplo, 123, Lisboa</p>
          <p><strong>Horário:</strong> Segunda a Sexta: 9h-18h, Sábado: 9h-14h</p>
        </div>
      ) : (
        <form onSubmit={handlePaymentSubmit} className="checkout-form">
          <div className="form-group">
            <label>Nome no Cartão *</label>
            <input
              type="text"
              value={paymentInfo.cardName}
              onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Número do Cartão *</label>
            <input
              type="text"
              value={paymentInfo.cardNumber}
              onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Validade *</label>
              <input
                type="text"
                value={paymentInfo.expiryDate}
                onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                placeholder="MM/AA"
                required
              />
            </div>
            <div className="form-group">
              <label>CVV *</label>
              <input
                type="text"
                value={paymentInfo.cvv}
                onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                placeholder="123"
                required
              />
            </div>
          </div>
        </form>
      )}

      <div className="navigation-buttons">
        <button onClick={() => setStep(1)} className="btn-secondary">
          Voltar
        </button>
        <button onClick={handlePaymentSubmit} className="btn-primary" disabled={isProcessing}>
          Rever Encomenda
        </button>
      </div>
    </div>
  );

  const renderOrderReview = () => (
    <div className="checkout-section">
      <h2 className={`section-title ${bokorFont.className}`}>Rever Encomenda</h2>
      
      <div className="order-summary">
        <div className="summary-section">
          <h3>Itens da Encomenda</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <span className="item-title">{item.title}</span>
                <span className="item-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <h3>Informações de Envio</h3>
          <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
          <p>{shippingInfo.email}</p>
          {shippingInfo.phone && <p>{shippingInfo.phone}</p>}
        </div>

        <div className="summary-section">
          <h3>Método de Envio</h3>
          <p>{shippingOptions.find(opt => opt.id === selectedShipping)?.name}</p>
          <p>{shippingOptions.find(opt => opt.id === selectedShipping)?.days}</p>
        </div>

        <div className="order-totals">
          <div className="total-line">
            <span>Subtotal:</span>
            <span>{calculateSubtotal().toFixed(2)}€</span>
          </div>
          <div className="total-line">
            <span>Envio:</span>
            <span>{getShippingCost() === 0 ? 'Grátis' : `${getShippingCost().toFixed(2)}€`}</span>
          </div>
          <div className="total-line total-final">
            <span>Total:</span>
            <span>{calculateTotal().toFixed(2)}€</span>
          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={() => setStep(2)} className="btn-secondary">
          Voltar
        </button>
        <button 
          onClick={handleOrderSubmit} 
          className="btn-primary"
          disabled={isProcessing}
        >
          {isProcessing ? 'A processar...' : 'Confirmar Encomenda'}
        </button>
      </div>
    </div>
  );

  const renderOrderComplete = () => (
    <div className="checkout-section order-complete">
      <div className="success-icon">✓</div>
      <h2 className={`section-title ${bokorFont.className}`}>Encomenda Confirmada!</h2>
      <p>A sua encomenda foi processada com sucesso.</p>
      <p>Receberá um email de confirmação em breve.</p>
      <p>Será redirecionado para a página inicial em alguns segundos...</p>
      
      <button onClick={() => router.push('/')} className="btn-primary">
        Voltar à Loja
      </button>
    </div>
  );

  return (
    <div className="checkout-container">
      <div className="checkout-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Envio</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Pagamento</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Revisão</div>
        <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4. Confirmação</div>
      </div>

      {step === 1 && renderShippingForm()}
      {step === 2 && renderPaymentForm()}
      {step === 3 && renderOrderReview()}
      {step === 4 && renderOrderComplete()}
    </div>
  );
};

export default Checkout;