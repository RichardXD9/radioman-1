// src/pages/api/create-payment-intent.js
import Stripe from 'stripe';
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (items) => {
  // Create a map to count quantities of each product
  const itemQuantities = new Map();
  for (const item of items) {
    itemQuantities.set(item._id, (itemQuantities.get(item._id) || 0) + 1);
  }

  const productIds = Array.from(itemQuantities.keys());
  const productsFromDB = await Product.find({ '_id': { $in: productIds } });

  let total = 0;
  const unavailableItems = [];
  const processedCart = [];

  for (const product of productsFromDB) {
    const productIdStr = product._id.toString();
    const quantity = itemQuantities.get(productIdStr);

    if (product.stock < quantity) {
      unavailableItems.push(`${product.name} (requested: ${quantity}, available: ${product.stock})`);
    }

    total += product.price * quantity;
    processedCart.push({ id: productIdStr, quantity });
  }

  if (unavailableItems.length > 0) {
    throw new Error(`Sorry, some items are unavailable: ${unavailableItems.join(', ')}`);
  }

  // Return both the total and the processed cart for metadata
  return { total, processedCart };
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items } = req.body;
    try {
      await dbConnect();
      // Now it returns an object with total and processed cart
      const { total, processedCart } = await calculateOrderAmount(items);

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'eur',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
        // Pass the cart items in metadata to use in the webhook
        metadata: {
          cartItems: JSON.stringify(processedCart)
        }
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}