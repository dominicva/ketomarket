import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// @ts-expect-error
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  const searchParams = new URL(req.url).searchParams;
  const total = Number(searchParams.get('total')) ?? 0;

  const paymentIntent = await stripe.paymentIntents.create({
    // Stripe expects the amount in cents
    amount: Number((total * 100).toFixed(0)),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
