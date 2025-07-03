// src/pages/api/products/list.js
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();

      const { type, genres, colors, availability } = req.query;
      let query = {};

      if (type) {
        query.type = type;
      }
      if (genres) {
        query.genre = { $in: Array.isArray(genres) ? genres : [genres] };
      }
      if (colors) {
        query.color = { $in: Array.isArray(colors) ? colors : [colors] };
      }
      if (availability) {
        const availabilityConditions = [];
        if (availability.includes('Disponível')) {
          availabilityConditions.push({ stock: { $gt: 0 } });
        }
        if (availability.includes('Esgotado')) {
          availabilityConditions.push({ stock: { $lte: 0 } });
        }
        if (availabilityConditions.length > 0) {
          query.$or = availabilityConditions;
        }
      }

      const products = await Product.find(query).lean();

      // The API should return raw data. The frontend is responsible for formatting.
      const responseProducts = products.map(p => ({ ...p, _id: p._id.toString() }));

      res.status(200).json({ success: true, data: responseProducts });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
