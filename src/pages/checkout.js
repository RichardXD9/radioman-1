import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from '../components/Navbar';

// Import the new step components
import ShippingDetails from '../components/checkout/ShippingDetails';
import OrderReview from '../components/checkout/OrderReview';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const steps = ['Envio', 'Pagamento', 'Revisão'];

// Main Checkout Component that will be wrapped by Elements
const CheckoutFlow = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(items);
    }, []);

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Nome é obrigatório.';
        if (!formData.email) newErrors.email = 'Email é obrigatório.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido.';
        if (!formData.address) newErrors.address = 'Morada é obrigatória.';
        if (!formData.city) newErrors.city = 'Cidade é obrigatória.';
        if (!formData.postalCode) newErrors.postalCode = 'Código Postal é obrigatório.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1) {
            if (validateStep1()) {
                setCurrentStep(2);
            }
        } else if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-complete`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsProcessing(false);
    };

    return (
        <div className="checkout-section">
            <div className="checkout-progress">
                {steps.map((step, index) => (
                    <div key={step} className={`progress-step ${currentStep === index + 1 ? 'active' : ''}`}>
                        {step}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1 is conditionally rendered and unmounted */}
                {currentStep === 1 && (
                    <ShippingDetails formData={formData} setFormData={setFormData} errors={errors} />
                )}

                {/* Steps 2 and 3 are handled here to keep PaymentElement mounted */}
                <div style={{ display: currentStep > 1 ? 'block' : 'none' }}>
                    {/* Payment Element is mounted for steps 2 and 3, but only visible on step 2 */}
                    <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                        <h3 className="section-title">Detalhes de Pagamento</h3>
                        <PaymentElement id="payment-element" />
                    </div>

                    {/* Review is only rendered and visible on step 3 */}
                    {currentStep === 3 && <OrderReview formData={formData} cartItems={cartItems} />}
                </div>

                <div className="navigation-buttons">
                    {currentStep > 1 && (
                        <button type="button" onClick={handleBack} className="btn-secondary">
                            Voltar
                        </button>
                    )}
                    {currentStep < steps.length ? (
                        <button type="button" onClick={handleNext} className="btn-primary" style={{ marginLeft: 'auto' }}>
                            Continuar
                        </button>
                    ) : (
                        <button type="submit" disabled={isProcessing || !stripe} className="btn-primary" style={{ marginLeft: 'auto' }}>
                            {isProcessing ? <div className="spinner" /> : 'Confirmar Encomenda'}
                        </button>
                    )}
                </div>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

// Main Page Component
const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        if (items.length > 0) {
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
            })
            .then((res) => {
                if (!res.ok) {
                    // If the response is not OK, throw an error to be caught by .catch()
                    return res.json().then(err => { throw new Error(err.message || 'Failed to create payment intent') });
                }
                return res.json();
            })
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => {
                console.error("Error creating payment intent:", error);
                // You could set an error state here to show a message to the user
            });
        }
    }, []);

    const appearance = {
        theme: 'night',
        labels: 'floating',
        variables: {
            colorPrimary: '#e11d48',
            colorBackground: '#1f1f1f',
            colorText: '#ffffff',
            colorDanger: '#ff4d4d',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            spacingUnit: '2px',
            borderRadius: '4px',
        }
    };

    const options = { clientSecret, appearance };

    return (
        <div className="checkout-container">
            <Navbar />
            <div className="checkout-grid">
                {clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutFlow />
                    </Elements>
                ) : (
                    <p>A carregar checkout...</p>
                )}
                {/* You can add your order summary component here if you want it separate */}
            </div>
        </div>
    );
};

export default CheckoutPage;