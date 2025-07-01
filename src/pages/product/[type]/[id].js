import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar';
import { Bokor } from 'next/font/google';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

const bokorFont = Bokor({
    subsets: ["latin"],
    weight: "400",
});

const ProductDetail = () => {
    const router = useRouter();
    const { id, type } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // All products data
    const allProducts = {
        vinyl: [
            {
                id: 1,
                image: '/images/adrenaline.jpg',
                title: 'Deftones - Adrenaline',
                availability: 'Disponível',
                description: 'Adrenaline Vinil',
                fullDescription: 'This is the debut studio album by American alternative metal band Deftones, released on October 3, 1995. The album features aggressive guitar riffs and Chino Moreno\'s distinctive vocal style. A classic piece for any vinyl collection.',
                price: '45.00 €',
                genre: 'Hardcore',
                color: 'Black',
                specifications: ['180g Vinyl', 'Gatefold Sleeve', 'Limited Edition']
            },
            {
                id: 2,
                image: '/images/Kornstl.jpg',
                title: 'Korn - Self Titled',
                availability: 'Disponível',
                description: 'Korn Vinil',
                fullDescription: 'The debut album from nu-metal pioneers Korn, released in 1994. This groundbreaking album introduced a new sound that would influence countless bands. Essential listening for metal fans.',
                price: '45.00 €',
                genre: 'Hardcore',
                color: 'Black',
                specifications: ['180g Vinyl', 'Original Artwork', 'Remastered Audio']
            },
            {
                id: 3,
                image: '/images/LPhybrid.jpg',
                title: 'Linkin Park - Hybrid Theory',
                availability: 'Disponível',
                description: 'Hybrid Theory Vinil',
                fullDescription: 'The debut album by Linkin Park, released in 2000. One of the best-selling albums of the 21st century, featuring hits like "In the End" and "Crawling". A must-have for any rock collection.',
                price: '45.00 €',
                genre: 'Hardcore',
                color: 'Black',
                specifications: ['180g Vinyl', 'Double LP', 'Digital Download Included']
            }
        ],
        cd: [
            {
                id: 1,
                image: '/images/adrenaline.jpg',
                title: 'Deftones - Adrenaline',
                availability: 'Disponível',
                description: 'Adrenaline CD',
                fullDescription: 'The debut studio album by Deftones on CD format. Crystal clear audio quality with all the original tracks. Perfect for audiophiles who prefer the convenience of CD format.',
                price: '25.00 €',
                genre: 'Hardcore',
                color: 'Preto',
                specifications: ['Original CD', 'Booklet Included', 'Remastered']
            },
            {
                id: 2,
                image: '/images/Kornstl.jpg',
                title: 'Korn - Self Titled',
                availability: 'Disponível',
                description: 'Korn CD',
                fullDescription: 'Korn\'s self-titled debut album on CD. Experience the raw power and innovation that started the nu-metal revolution. High-quality audio reproduction.',
                price: '25.00 €',
                genre: 'Numetal',
                color: 'Branco',
                specifications: ['Original CD', 'Lyric Booklet', 'Enhanced Audio']
            },
            {
                id: 3,
                image: '/images/LPhybrid.jpg',
                title: 'Linkin Park - Hybrid Theory',
                availability: 'Disponível',
                description: 'Hybrid Theory CD',
                fullDescription: 'Linkin Park\'s breakthrough album on CD format. Features all the hits that made this one of the most successful debut albums ever. Superior sound quality.',
                price: '25.00 €',
                genre: 'Alternative',
                color: 'Vermelho',
                specifications: ['Original CD', 'Photo Booklet', 'Bonus Content']
            }
        ],
        merch: [
            {
                id: 1,
                image: '/images/deftones-tshirt.jpg',
                title: 'Deftones - Band T-Shirt',
                availability: 'Disponível',
                description: 'Official Deftones Band T-Shirt',
                fullDescription: 'Official Deftones merchandise featuring the iconic band logo. Made from high-quality cotton for comfort and durability. Perfect for concerts or casual wear.',
                price: '25.00 €',
                genre: 'Hardcore',
                color: 'Preto',
                specifications: ['100% Cotton', 'Pre-shrunk', 'Available in S-XXL']
            },
            {
                id: 2,
                image: '/images/korn-hoodie.jpg',
                title: 'Korn - Hoodie',
                availability: 'Disponível',
                description: 'Official Korn Hoodie',
                fullDescription: 'Stay warm in style with this official Korn hoodie. Features the band\'s logo and artwork. Made from a comfortable cotton-polyester blend.',
                price: '45.00 €',
                genre: 'Numetal',
                color: 'Preto',
                specifications: ['80% Cotton 20% Polyester', 'Drawstring Hood', 'Kangaroo Pocket']
            },
            {
                id: 3,
                image: '/images/linkinpark-cap.jpg',
                title: 'Linkin Park - Baseball Cap',
                availability: 'Disponível',
                description: 'Official Linkin Park Cap',
                fullDescription: 'Show your support for Linkin Park with this official baseball cap. Adjustable fit with embroidered logo. Perfect for any fan.',
                price: '20.00 €',
                genre: 'Alternative',
                color: 'Preto',
                specifications: ['Adjustable Strap', 'Embroidered Logo', 'One Size Fits All']
            }
        ]
    };

    useEffect(() => {
        if (id && type) {
            const productList = allProducts[type] || [];
            const foundProduct = productList.find(p => p.id === parseInt(id));
            setProduct(foundProduct);
            setLoading(false);
        }
    }, [id, type]);

    const handleBuyClick = () => {
        if (!product) return;

        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const updatedCartItems = [...cartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        window.dispatchEvent(new Event('cartUpdated'));
        
        alert(`Produto ${product.title} adicionado ao carrinho!`);
    };

    const handleBackClick = () => {
        switch(type) {
            case 'vinyl':
                router.push('/vinil');
                break;
            case 'cd':
                router.push('/cd');
                break;
            case 'merch':
                router.push('/merch');
                break;
            default:
                router.push('/');
        }
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl">Loading...</div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="text-xl">Product not found</div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <Navbar />
            <div className="container mx-auto px-4 product-detail-container">
                <button
                    onClick={handleBackClick}
                    className="back-button"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span>Back to {type === 'vinyl' ? 'Vinyl' : type === 'cd' ? 'CDs' : 'Merchandise'}</span>
                </button>
                
                <div className="product-grid">
                    <div className="product-image-wrapper">
                        <img 
                            src={product.image} 
                            alt={product.title}
                            className="product-image"
                        />
                    </div>

                    <div className="product-info">
                        <div className="product-info-header">
                            <h1 className={`product-title ${bokorFont.className}`}>
                                {product.title}
                            </h1>

                            <div className="flex items-center">
                                <span className={`availability-badge ${product.availability === 'Disponível' ? 'available' : 'unavailable'}`}>
                                    {product.availability}
                                </span>
                            </div>

                            <p className="product-price">{product.price}</p>
                        </div>

                        <div>
                            <h3 className="product-section-title">Description</h3>
                            <p className="product-description">{product.fullDescription}</p>
                        </div>

                        {product.specifications && (
                            <div>
                                <h3 className="product-section-title">Specifications</h3>
                                <ul className="specifications-list">
                                    {product.specifications.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handleBuyClick}
                            disabled={product.availability !== 'Disponível'}
                            className="buy-button-detail"
                        >
                            <ShoppingCartIcon />
                            <span>
                                {product.availability === 'Disponível' 
                                    ? 'Add to Cart' 
                                    : 'Out of Stock'
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;