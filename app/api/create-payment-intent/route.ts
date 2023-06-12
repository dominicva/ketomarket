import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCartData } from '@/lib/cart';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2022-11-15',
});

export async function POST() {
  const {
    data: { cartTotal },
  } = await getCartData();

  const session = await stripe.checkout.sessions.create({
    // include client reference id to check it matches the user on the success page
    // client_reference_id: '1234',
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
    success_url: 'http://localhost:3000/checkout/success',
    cancel_url: 'http://localhost:3000/checkout/cancel',
  });

  console.log('session', session);

  // const paymentIntent = await stripe.paymentIntents.create({
  //   // Stripe expects the amount in cents
  //   amount: Number((cartTotal * 100).toFixed(0)),
  //   currency: 'usd',
  //   automatic_payment_methods: {
  //     enabled: true,
  //   },
  // });

  // return NextResponse.json({
  //   clientSecret: paymentIntent.client_secret,
  // });
  return NextResponse.redirect(String(session.url), { status: 303 });
}
