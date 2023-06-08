import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// @ts-expect-error
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export async function POST(req: NextRequest, res: NextResponse) {
  // if (req.method !== 'POST') {
  //   return NextResponse.json({ error: 'Method not allowed' });
  // }

  const { items } = await req.json();

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
