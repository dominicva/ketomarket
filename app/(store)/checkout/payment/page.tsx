'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { Button } from '@/components/buttons';
import Link from 'next/link';

const stripePromise = loadStripe(
  String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
);

export default function Payment() {
  // const { total } = useParams();
  // const [clientSecret, setClientSecret] = useState('');

  // useEffect(() => {
  //   fetch(`/api/create-payment-intent`, {
  //     method: 'POST',
  //   })
  //     .then(res => res.json())
  //     .then(data => setClientSecret(data.clientSecret));
  // }, [total]);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    <div>
      {/* {clientSecret && (
        // @ts-expect-error
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )} */}
      <form action="/api/create-payment-intent" method="POST">
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}
