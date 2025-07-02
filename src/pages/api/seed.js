// src/pages/api/seed.js
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';

const sampleProducts = [
  {
    name: 'Classic Rock Vinyl',
    description: 'A collection of classic rock hits on a 12" vinyl record.',
    price: 2500, // 25.00 € in cents
    image: '/images/placeholder.png', // You can replace with actual image paths
    type: 'vinyl',
    genre: ['Rock', 'Classic Rock'],
    color: ['Black'],
    stock: 15,
  },
  {
    name: 'Indie Pop CD',
    description: 'The latest album from your favorite indie pop band.',
    price: 1500, // 15.00 € in cents
    image: '/images/placeholder.png',
    type: 'cd',
    genre: ['Pop', 'Indie'],
    color: ['Silver'],
    stock: 30,
  },
  {
    name: 'Band Logo T-Shirt',
    description: 'Official band merchandise. High-quality cotton t-shirt.',
    price: 2000, // 20.00 € in cents
    image: '/images/placeholder.png',
    type: 'merch',
    genre: ['Apparel'],
    color: ['Black', 'White'],
    stock: 50,
  },
  {
    name: 'Out of Stock Vinyl',
    description: 'A rare, out-of-stock record that is highly sought after.',
    price: 5000, // 50.00 € in cents
    image: '/images/placeholder.png',
    type: 'vinyl',
    genre: ['Rock'],
    color: ['Black'],
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
