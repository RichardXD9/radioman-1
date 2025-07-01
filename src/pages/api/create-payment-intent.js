import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // In a real application, you should fetch the prices from your database
  // to prevent customers from manipulating them on the client-side.
  let total = 0;
  items.forEach(item => {
    // Example price string: "45.00 €"
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
    if (!isNaN(price)) {
      total += price;
    }
  });
  // Stripe expects the amount in the smallest currency unit (e.g., cents for EUR).
  return Math.round(total * 100);
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items } = req.body;

    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'eur',
        automatic_payment_methods: {
          enabled: true,
        },
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

