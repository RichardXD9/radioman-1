// src/pages/api/products/[type]/[id].js
import clientPromise from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id, type } = req.query;
      await clientPromise; // Ensure DB connection

      const product = await Product.findOne({ id: id, type: type }).lean();

      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      // Format price from cents to string for the frontend
      const formattedProduct = {
        ...product,
        price: `${(product.price / 100).toFixed(2)} €`,
        _id: product._id.toString(),
      };

      res.status(200).json({ success: true, data: formattedProduct });
    } catch (error) {
      console.error('Error fetching single product:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}