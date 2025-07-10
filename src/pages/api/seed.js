// src/pages/api/seed.js
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';

const sampleProducts = [
  {
    name: 'Deftones- Adrenaline',
    description: 'Primeiro álbum da banda com uma energia nunca antes feita',
    price: 2500, // 25.00 € in cents
    image: '/images/adrenaline.jpg', // You can replace with actual image paths
    type: 'vinyl',
    genre: ['Numetal'],
    color: ['Branco'],
    stock: 5,
  },
  {
    name: 'Korn- Self Titled',
    description: 'Primeiro álbum da banda com sons tão únicos que criaram um novo sub-gênero',
    price: 1000, // 10.00 € in cents
    image: '/images/Kornstl.jpg',
    type: 'cd',
    genre: ['Numetal'],
    color: ['Vermelho'],
    stock: 3,
  },
  {
    name: 'White Pony T-Shirt',
    description: 'T-shirt de banda ofical. Algodão de alta qualidade',
    price: 2000, // 20.00 € in cents
    image: '/images/whiteponyshirt.jpg',
    type: 'merch',
    genre: ['Alternative'],
    color: ['Branco'],
    stock: 3,
  },
  {
    name: 'Linkin Park- Meteora',
    description: 'Segundo album de Linkin Park com vocais inigualaveis',
    price: 4500, // 45.00 € in cents
    image: '/images/LPmeteora.jpg',
    type: 'vinyl',
    genre: ['Alternative'],
    color: ['Preto'],
    stock: 0, // This will show as 'Esgotado'
  },
  {
    name: 'System Of A Down- Toxicity',
    description: 'Segundo album da banda incorporando mais melodia, harmonias e canto',
    price: 1000, // 10.00 € in cents
    image: '/images/SOADtoxi.jpg',
    type: 'cd',
    genre: ['Alternative'],
    color: ['Vermelho'],
    stock: 2, 
  },
  {
    name: 'Sunami- Self Titled',
    description: 'Primeiro álbum lançado com músicas de EPs anteriores',
    price: 2500, // 25.00 € in cents
    image: '/images/sunami.jpg',
    type: 'vinyl',
    genre: ['Hardcore'],
    color: ['Branco'],
    stock: 1, 
  },
   {
    name: 'GreenDay- Dookie',
    description: 'Terceiro álbum da banda sendo a primeira colaboração da banda com o produtor Rob Cavallo',
    price: 750.0, // 7,5.00 € in cents
    image: '/images/Greenday.jpg',
    type: 'cd',
    genre: ['Punk'],
    color: ['Branco'],
    stock: 4, 
  },
];

export default async function handler(req, res) {
  // It's safer to use POST for actions that modify the database.
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed. Please use POST.' });
  }

  // Add a check to prevent this from running in production.
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, message: 'This endpoint is not available in production.' });
  }

  try {
    await dbConnect();

    // Clear existing products to avoid duplicates on re-runs
    await Product.deleteMany({});
    console.log('Cleared existing products.');
    await Product.insertMany(sampleProducts);
    console.log('Inserted new sample products.');

    res.status(200).json({ success: true, message: 'Database seeded successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to seed database: ' + error.message });
  }
}
