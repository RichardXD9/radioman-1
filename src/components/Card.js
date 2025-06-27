import React from 'react';
import { useRouter } from 'next/router';

const Card = ({ 
    id,
    image, 
    title, 
    availability, 
    description, 
    price, 
    onBuyClick, 
    bokorFont,
    productType = 'vinyl' // vinyl, cd, or merch
}) => {
    const router = useRouter();

    const handleCardClick = (e) => {
        // Prevent navigation if the buy button was clicked
        if (e.target.closest('.buy-button')) {
            return;
        }
        
        // Navigate to product detail page
        router.push(`/product/${productType}/${id}`);
    };

    const handleBuyClick = (e) => {
        e.stopPropagation(); // Prevent card click when buy button is clicked
        onBuyClick();
    };

    return (
        <div 
            className="card-container cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={handleCardClick}
        >
            <div className="card">
                <img src={image} alt={title} className="card-image" />
                <div className="card-content">
                    <h3 className={`card-title ${bokorFont.className}`}>{title}</h3>
                    <div className={`availability ${availability === 'Disponível' ? 'available' : 'unavailable'}`}>
                        {availability}
                    </div>
                    <p className="card-description">{description}</p>
                    <div className="card-footer">
                        <span className="price">{price}</span>
                        <button 
                            className="buy-button"
                            onClick={handleBuyClick}
                            disabled={availability !== 'Disponível'}
                        >
                            {availability === 'Disponível' ? 'Buy' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;