import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCartData } from '@/lib/cart';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2022-11-15',
});

export async function POST() {
  const {
    data: { cart, cartTotal },
  } = await getCartData();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Ketomarket',
            description:
              'The finest keto products are almost on their way to you!',
            images: [
              'https://res.cloudinary.com/dwyxxivqb/image/upload/v1686152734/samples/food/fish-vegetables.jpg',
            ],
          },
          unit_amount: Number((cartTotal * 100).toFixed(0)),
        },
        quantity: 1,
      },
    ],
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `http://localhost:3000/checkout/${cart?.id}/success`,
    cancel_url: `http://localhost:3000/checkout/${cart?.id}/cancel`,
  });

  return NextResponse.redirect(String(session.url), { status: 303 });
}
