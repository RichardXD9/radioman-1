import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../src/components/Navbar';
import { Bokor } from 'next/font/google';

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
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <button 
                    onClick={handleBackClick}
                    className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors"
                >
                    ← Back to {type === 'vinyl' ? 'Vinyl' : type === 'cd' ? 'CDs' : 'Merchandise'}
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex justify-center">
                        <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-full max-w-md rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className={`text-3xl font-bold mb-2 ${bokorFont.className}`}>
                                {product.title}
                            </h1>
                            <div className="flex items-center space-x-4 mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    product.availability === 'Disponível' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.availability}
                                </span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {product.price}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-700">{product.fullDescription}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-semibold">Genre:</span>
                                    <span className="ml-2">{product.genre}</span>
                                </div>
                                <div>
                                    <span className="font-semibold">Color:</span>
                                    <span className="ml-2">{product.color}</span>
                                </div>
                            </div>

                            {product.specifications && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {product.specifications.map((spec, index) => (
                                            <li key={index} className="text-gray-700">{spec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleBuyClick}
                                disabled={product.availability !== 'Disponível'}
                                className={`w-full py-3 px-6 rounded-lg text-white font-semibold text-lg transition-colors ${
                                    product.availability === 'Disponível'
                                        ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {product.availability === 'Disponível' 
                                    ? 'Add to Cart' 
                                    : 'Out of Stock'
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;