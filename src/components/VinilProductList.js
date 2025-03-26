import React, { useState, useMemo } from 'react';
import Card from './Card';
import {Bokor} from 'next/font/google';
import '../styles/filter.css';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const VinilProductList = ({ filters }) => {
    // Vinyl-specific products with unique items
    const vinylProducts = [
        {
            id: 1,
            image: '/images/adrenaline.jpg',
            title: 'Deftones - Adrenaline',
            availability: 'Disponível',
            description: 'Adrenaline Vinil',
            price: '45.00 €',
            genre: 'Hardcore',
            color: 'Black'
        },
        {
            id: 2,
            image: '/images/Kornstl.jpg',
            title: 'Korn- Self Titled',
            availability: 'Disponível',
            description: 'Korn Vinil',
            price: '45.00 €',
            genre: 'Numetal',
            color: 'Black'
        },
        {
            id: 3,
            image: '/images/LPhybrid.jpg',
            title: 'Linkin Park - Hybrid Theory',
            availability: 'Disponível',
            description: 'Hybrid Theory Vinil',
            price: '45.00 €',
            genre: 'Numetal',
            color: 'Black'
        },
        {
            id: 4,
            image: '/images/LPmeteora.jpg',
            title: 'Linkin Park - Meteora',
            availability: 'Disponível',
            description: 'Meteora Vinil',
            price: '45.00 €',
            genre: 'Hardcore',
            color: 'Black'
        },
        {
            id: 5,
            image: '/images/SOADsteal.jpg',
            title: 'System Of A Down - Steal This Album',
            availability: 'Disponível',
            description: 'Steal This Album Vinil',
            price: '45.00 €',
            genre: 'Numetal',
            color: 'Black'
        },

        // ... (rest of the products remain the same)
    ];

    const filteredProducts = useMemo(() => {
        return vinylProducts.filter(product => {
            const genreMatch = filters.genres.length === 0 || 
                filters.genres.includes(product.genre);
            const colorMatch = filters.colors.length === 0 || 
                filters.colors.includes(product.color);
            const availabilityMatch = filters.availability.length === 0 || 
                filters.availability.includes(product.availability);
            
            return genreMatch && colorMatch && availabilityMatch;
        });
    }, [vinylProducts, filters]);

    const handleBuyClick = (productName) => {
        alert(`Vinil ${productName} adicionado ao carrinho!`);
    };

    return (
        <div className="flex">
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

export default VinilProductList;