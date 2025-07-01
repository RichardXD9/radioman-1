// src/pages/api/create-payment-intent.js
import Stripe from 'stripe';
import clientPromise from '../../lib/mongodb';
import Product from '../../models/Product';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (items) => {
  const productIds = items.map(item => item.id);
  const productsFromDB = await Product.find({ 'id': { $in: productIds } });

  let total = 0;
  const unavailableItems = [];

  for (const item of items) {
    const product = productsFromDB.find(p => p.id === item.id);

    if (!product) {
      throw new Error(`Product with ID ${item.id} not found.`);
    }

    // Check stock. Assuming quantity is 1 for now.
    if (product.stock < 1) {
      unavailableItems.push(product.title);
    }

    total += product.price; // Price is already in cents
  }

  if (unavailableItems.length > 0) {
    throw new Error(`Sorry, the following items are out of stock: ${unavailableItems.join(', ')}`);
  }

  return total;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items } = req.body;
    try {
      await clientPromise;
      const amount = await calculateOrderAmount(items);

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
        // Pass the cart items in metadata to use in the webhook
        metadata: {
          cartItems: JSON.stringify(items.map(item => ({ id: item.id, quantity: 1 })))
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