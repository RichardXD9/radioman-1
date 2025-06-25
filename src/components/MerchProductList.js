import React, { useMemo } from 'react';
import Card from './Card';
import {Bokor} from 'next/font/google';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight:"400",
});
  
const MerchProductList = ({ filters = { genres: [], colors: [], availability: [] }, onAddToCart }) => {
    // Merchandise products with band-related items
    const merchProducts = [
        {
            id: 1,
            image: '/images/deftones-tshirt.jpg',
            title: 'Deftones - Band T-Shirt',
            availability: 'Disponível',
            description: 'Official Deftones Band T-Shirt',
            price: '25.00 €',
            genre: 'Hardcore',
            color: 'Preto'
        },
        {
            id: 2,
            image: '/images/korn-hoodie.jpg',
            title: 'Korn - Hoodie',
            availability: 'Disponível',
            description: 'Official Korn Hoodie',
            price: '45.00 €',
            genre: 'Numetal',
            color: 'Preto'
        },
        {
            id: 3,
            image: '/images/linkinpark-cap.jpg',
            title: 'Linkin Park - Baseball Cap',
            availability: 'Disponível',
            description: 'Official Linkin Park Cap',
            price: '20.00 €',
            genre: 'Alternative',
            color: 'Preto'
        },
        {
            id: 4,
            image: '/images/metallica-patch.jpg',
            title: 'Metallica - Logo Patch',
            availability: 'Disponível',
            description: 'Official Metallica Embroidered Patch',
            price: '8.00 €',
            genre: 'Hardcore',
            color: 'Preto'
        },
        {
            id: 5,
            image: '/images/slipknot-mask.jpg',
            title: 'Slipknot - Replica Mask',
            availability: 'Esgotado',
            description: 'Slipknot Band Member Replica Mask',
            price: '65.00 €',
            genre: 'Numetal',
            color: 'Branco'
        },
        {
            id: 6,
            image: '/images/ramones-poster.jpg',
            title: 'Ramones - Vintage Poster',
            availability: 'Disponível',
            description: 'Classic Ramones Concert Poster',
            price: '15.00 €',
            genre: 'Punk',
            color: 'Branco'
        },
        {
            id: 7,
            image: '/images/nirvana-keychain.jpg',
            title: 'Nirvana - Smiley Keychain',
            availability: 'Disponível',
            description: 'Official Nirvana Smiley Face Keychain',
            price: '12.00 €',
            genre: 'Alternative',
            color: 'Vermelho'
        },
        {
            id: 8,
            image: '/images/tool-sticker.jpg',
            title: 'Tool - Sticker Pack',
            availability: 'Disponível',
            description: 'Tool Band Logo Sticker Set',
            price: '5.00 €',
            genre: 'Alternative',
            color: 'Preto'
        },
        {
            id: 9,
            image: '/images/rage-tshirt.jpg',
            title: 'Rage Against The Machine - Tee',
            availability: 'Disponível',
            description: 'RATM Political Statement T-Shirt',
            price: '28.00 €',
            genre: 'Hardcore',
            color: 'Vermelho'
        },
        {
            id: 10,
            image: '/images/system-hoodie.jpg',
            title: 'System of a Down - Hoodie',
            availability: 'Disponível',
            description: 'System of a Down Official Hoodie',
            price: '50.00 €',
            genre: 'Numetal',
            color: 'Preto'
        }
    ];

    const filteredProducts = useMemo(() => {
        return merchProducts.filter(product => {
            const genreMatch = filters.genres.length === 0 || 
                filters.genres.includes(product.genre);
            const colorMatch = filters.colors.length === 0 || 
                filters.colors.includes(product.color);
            const availabilityMatch = filters.availability.length === 0 || 
                filters.availability.includes(product.availability);
            
            return genreMatch && colorMatch && availabilityMatch;
        });
    }, [merchProducts, filters]);

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

export default MerchProductList;