import React from 'react';

const ShippingDetails = ({ formData, setFormData, errors }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="checkout-form">
            <h3 className="section-title">Endereço de Entrega</h3>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="name">Nome Completo</label>
                    <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} required />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="address">Morada</label>
                <input type="text" id="address" name="address" value={formData.address || ''} onChange={handleChange} required />
                {errors.address && <p className="error-message">{errors.address}</p>}
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input type="text" id="city" name="city" value={formData.city || ''} onChange={handleChange} required />
                    {errors.city && <p className="error-message">{errors.city}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Código Postal</label>
                    <input type="text" id="postalCode" name="postalCode" value={formData.postalCode || ''} onChange={handleChange} required />
                    {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
                </div>
            </div>
        </div>
    );
};

export default ShippingDetails;

