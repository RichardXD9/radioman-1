import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';

export default async function handler(req, res) {
  try {
    await dbConnect(); // Establish connection using the project's standard helper

    // Example: Fetch up to 5 products using the existing Product model
    const data = await Product.find({}).limit(5);

    res.status(200).json({ success: true, message: 'Connection successful, found products.', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}