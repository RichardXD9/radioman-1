// src/pages/api/products/[id].js
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      await dbConnect();

      // Use Mongoose to find the product by its unique ID
      const product = await Product.findById(id).lean();

      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      // Format price from cents to string for the frontend
      const formattedProduct = { ...product, price: `${(product.price / 100).toFixed(2)} €`, _id: product._id.toString() };

      res.status(200).json({ success: true, data: formattedProduct });
    } catch (error) {
      // This catches errors like an invalid ID format, preventing a server crash
      res.status(400).json({ success: false, error: 'Invalid Product ID or server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

