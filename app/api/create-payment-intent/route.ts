import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCartData } from '@/lib/cart';

// @ts-expect-error
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const {
    data: { cartTotal },
  } = await getCartData();

  const paymentIntent = await stripe.paymentIntents.create({
    // Stripe expects the amount in cents
    amount: Number((cartTotal * 100).toFixed(0)),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
