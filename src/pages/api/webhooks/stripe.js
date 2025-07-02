import Stripe from 'stripe';
import { buffer } from 'micro';
import dbConnect from '../../../lib/dbConnect';
import mongoose from 'mongoose';
import Product from '../../../models/Product';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('✅ PaymentIntent was successful!');
      
      try {
        await dbConnect();
        const cartItems = JSON.parse(paymentIntent.metadata.cartItems);

        // Use a bulk write operation for efficiency
        const operations = cartItems.map(item => ({
          updateOne: {
            // Cast the string ID from metadata back to a MongoDB ObjectId
            filter: { _id: new mongoose.Types.ObjectId(item.id), stock: { $gte: item.quantity } },
            update: { $inc: { stock: -item.quantity } },
          },
        }));

        if (operations.length > 0) {
          const result = await Product.bulkWrite(operations);
          if (result.modifiedCount > 0) {
            console.log(`✅ Stock updated for ${result.modifiedCount} products.`);
          } else {
            // This can happen if stock was already 0, or if another process updated it first.
            console.warn(`⚠️ Stock update operation ran, but no products were modified. This could be due to a stock race condition or incorrect product IDs.`);
          }
        }
      } catch (dbError) {
        console.error('❌ Database update failed:', dbError);
        // You might want to add logic here to handle the failure,
        // like sending an alert to yourself.
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
