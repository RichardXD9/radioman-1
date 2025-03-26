import React, { useState, useMemo } from 'react';
import Card from './Card';
import Filter from './Filter';
import {Bokor} from 'next/font/google';
import '../styles/filter.css';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const ProductList = () => {
    // Define products outside of the component function
    const products = [
        {
            id: 1,
            image: '/images/threedolla.jpg',
            title: 'Limp Bizkit',
            availability: 'Disponível',
            description: "Three Dollar Bills, Y'all (CD)",
            price: '34.00 €',
            genre: 'Numetal',
            color: 'Black'
        },
        {
            id: 2,
            image: '/images/adrenaline.jpg',
            title: 'Deftones',
            availability: 'Disponível',
            description: 'Adrenaline (Vinil)',
            price: '28.00 €',
            genre: 'Hardcore',
            color: 'White'
        },
        {
            id: 3,
            image: '/images/adrenaline.jpg',
            title: 'Deftones Alternate',
            availability: 'Esgotado',
            description: 'Adrenaline (Vinil) Limited Edition',
            price: '35.00 €',
            genre: 'Numetal',
            color: 'Red'
        },
        {
            id: 4,
            image: '/images/adrenaline.jpg',
            title: 'Deftones Alternate',
            availability: 'Esgotado',
            description: 'Adrenaline (Vinil) Limited Edition',
            price: '35.00 €',
            genre: 'Numetal',
            color: 'Red'
        },
        {
          id: 5,
          image: '/images/adrenaline.jpg',
          title: 'Deftones Alternate',
          availability: 'Esgotado',
          description: 'Adrenaline (Vinil) Limited Edition',
          price: '35.00 €',
          genre: 'Numetal',
          color: 'Red'
        },
        {
          id: 6,
          image: '/images/adrenaline.jpg',
          title: 'Deftones Alternate',
          availability: 'Esgotado',
          description: 'Adrenaline (Vinil) Limited Edition',
          price: '35.00 €',
          genre: 'Numetal',
          color: 'Red'
        },
        {
          id: 7,
          image: '/images/adrenaline.jpg',
          title: 'Deftones Alternate',
          availability: 'Esgotado',
          description: 'Adrenaline (Vinil) Limited Edition',
          price: '35.00 €',
          genre: 'Hardcore',
          color: 'Red'
        },
        {
          id: 8,
          image: '/images/adrenaline.jpg',
          title: 'Deftones Alternate',
          availability: 'Esgotado',
          description: 'Adrenaline (Vinil) Limited Edition',
          price: '35.00 €',
          genre: 'Hardcore',
          color: 'Red'
        },
    ];

    const [filters, setFilters] = useState({
        genres: [],
        colors: [],
        availability: []
    });

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const genreMatch = filters.genres.length === 0 || 
                filters.genres.includes(product.genre);
            const colorMatch = filters.colors.length === 0 || 
                filters.colors.includes(product.color);
            const availabilityMatch = filters.availability.length === 0 || 
                filters.availability.includes(product.availability);
            
            return genreMatch && colorMatch && availabilityMatch;
        });
    }, [products, filters]);

    const handleBuyClick = (productName) => {
        alert(`Produto ${productName} adicionado ao carrinho!`);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="flex">
            <Filter onFilterChange={handleFilterChange} />
            <div className="product-list ml-64">
                {filteredProducts.map((product) => (
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
        </div>
    );
};

export default ProductList;