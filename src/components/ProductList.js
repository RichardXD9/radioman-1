import React from 'react';
import Card from './Card';

import {Bokor} from 'next/font/google';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
  });
  
const ProductList = () => {
    const handleBuyClick = (productName) => {
        alert(`Produto ${productName} adicionado ao carrinho!`);
      };

  const products = [
    {
      id: 1,
      image: '/images/threedolla.jpg',
      title: 'Limp Bizkit',
      availability: 'Disponível',
      description: "Three Dollar Bills, Y'all (CD)",
      price: '34.00 €',
    
    },
    {
      id: 2,
      image: '/images/adrenaline.jpg',
      title: 'Deftones',
      availability: 'Disponível',
      description: 'Adrenaline (Vinil)',
      price: '28.00 €',
    },
    {
      id: 3,
      image: '/images/adrenaline.jpg',
      title: 'Deftones',
      availability: 'Disponível',
      description: 'Adrenaline (Vinil)',
      price: '28.00 €',
    },
    // Adicione mais produtos aqui
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <Card
          key={product.id}
          image={product.image}
          title={product.title}
          availability={product.availability}
          description={product.description}
          price={product.price}
          onBuyClick={() => handleBuyClick(product.title)} 
          bokorFont={bokorFont}
        />
      ))}
    </div>
  );
};

export default ProductList;