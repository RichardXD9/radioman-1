import React, { useState, useMemo } from 'react';
import Card from './Card';
import {Bokor} from 'next/font/google';
import '../styles/filter.css';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const VinilProductList = () => {
    // Vinyl-specific products
    const vinylProducts = [
            {
                id: 1,
                image: '/images/adrenaline.jpg',
                title: 'Deftones - Adrenaline',
                availability: 'Disponível',
                description: 'Adrenaline Vinyl (First Press)',
                price: '45.00 €',
                genre: 'Hardcore',
                color: 'Black'
            },
            {
                id: 2,
                image: '/images/whitepony.png',
                title: 'Deftones - White Pony',
                availability: 'Disponível',
                description: 'White Pony Vinyl Limited Edition',
                price: '55.00 €',
                genre: 'Alternative',
                color: 'White'
            },
            {
                id: 3,
                image: '/images/threedolla.jpg',
                title: 'Limp Bizkit - Three Dollar Bills',
                availability: 'Esgotado',
                description: 'Three Dollar Bills Vinyl Rare Edition',
                price: '65.00 €',
                genre: 'Numetal',
                color: 'Red'
            },
            {
                id: 4,
                image: '/images/Kornstl.jpg',
                title: 'Korn - Self Titled',
                availability: 'Disponível',
                description: 'Korn First Album Vinyl',
                price: '50.00 €',
                genre: 'Numetal',
                color: 'Black'
            },
            {
                id: 5,
                image: '/images/SOADsteal.jpg',
                title: 'System of a Down - Steal This Album',
                availability: 'Esgotado',
                description: 'Steal This Album Vinyl',
                price: '40.00 €',
                genre: 'Alternative',
                color: 'Blue'
            },
            {
                id: 6,
                image: '/images/SOADsteal.jpg',
                title: 'System of a Down - Steal This Album',
                availability: 'Esgotado',
                description: 'Steal This Album Vinyl',
                price: '40.00 €',
                genre: 'Alternative',
                color: 'Blue'
            },
            {
                id: 7,
                image: '/images/SOADsteal.jpg',
                title: 'System of a Down - Steal This Album',
                availability: 'Esgotado',
                description: 'Steal This Album Vinyl',
                price: '40.00 €',
                genre: 'Alternative',
                color: 'Blue'
            },
            {
                id: 8,
                image: '/images/SOADsteal.jpg',
                title: 'System of a Down - Steal This Album',
                availability: 'Esgotado',
                description: 'Steal This Album Vinyl',
                price: '40.00 €',
                genre: 'Alternative',
                color: 'Blue'
            },
        
       
    ];

    const [filters, setFilters] = useState({
        genres: [],
        colors: [],
        availability: []
    });

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

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
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