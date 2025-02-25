import React from 'react';
import PropTypes from 'prop-types';
import {Bokor} from 'next/font/google';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
  });


const Card = ({ image, title, availability, description, price, onBuyClick, bokorFont }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-availability">{availability}</p>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <p className="card-price">{price}</p>
        <button 
        className={`card-buy ${bokorFont.className}`} onClick={onBuyClick}  
      >
        Comprar
      </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  availability: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onBuyClick: PropTypes.func.isRequired,
  bokorFont: PropTypes.object.isRequired,
};

export default Card;