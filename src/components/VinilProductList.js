import React, { useMemo } from 'react';
import Card from './Card';
import {Bokor} from 'next/font/google';


const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const VinilProductList = ({ filters = { genres: [], colors: [], availability: [] }, onAddToCart }) => {
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
            title: 'Korn - Self Titled',
            availability: 'Disponível',
            description: 'Korn Vinil',
            price: '45.00 €',
            genre: 'Hardcore',
            color: 'Black'
        },
        {
            id: 3,
            image: '/images/LPhybrid.jpg',
            title: 'Linkin Park - Hybrid Theory',
            availability: 'Disponível',
            description: 'Hybrid Theory Vinil',
            price: '45.00 €',
            genre: 'Hardcore',
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

    const handleBuyClick = (product) => {
        // Add to cart and save to local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = [...cartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        window.dispatchEvent(new Event('cartUpdated'));
        
        // Call the onAddToCart prop if provided
        if (onAddToCart) {
            onAddToCart(product);
        }
        
        // Optional: Show a confirmation
        alert(`Produto ${product.title} adicionado ao carrinho!`);
    };

    return (
        <div className="product-list ml-64">
            {filteredProducts.map((product) => (
                <Card
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    availability={product.availability}
                    description={product.description}
                    price={product.price}
                    onBuyClick={() => handleBuyClick(product)}
                    bokorFont={bokorFont}
                />
            ))}
        </div>
    );
};

export default VinilProductList;