// src/pages/api/seed.js
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';

const sampleProducts = [
  {
    name: 'Deftones- Adrenaline',
    description: 'First Deftones album with the raw nu metal vibes.',
    price: 2500, // 25.00 € in cents
    image: '/images/adrenaline.jpg', // You can replace with actual image paths
    type: 'vinyl',
    genre: ['Numetal'],
    color: ['Branco'],
    stock: 5,
  },
  {
    name: 'Korn- Self Titled',
    description: 'Korn self titled and first album with unique sounds that created a whole new sub genre.',
    price: 1500, // 15.00 € in cents
    image: '/images/Kornstl.jpg',
    type: 'cd',
    genre: ['Numetal'],
    color: ['Vermelho'],
    stock: 30,
  },
  {
    name: 'White Pony T-Shirt',
    description: 'T-shirt de banda ofical. Algodão de alta qualidade',
    price: 2000, // 20.00 € in cents
    image: '/images/whiteponyshirt.jpg',
    type: 'merch',
    genre: ['Alternative'],
    color: ['Branco'],
    stock: 50,
  },
  {
    name: 'Linkin Park- Meteora',
    description: 'Segundo album de Linkin Park com vocais inigualaveis',
    price: 5000, // 50.00 € in cents
    image: '/images/LPmeteora.jpg',
    type: 'vinyl',
    genre: ['Alternative'],
    color: ['Branco'],
    stock: 0, // This will show as 'Esgotado'
  },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
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
