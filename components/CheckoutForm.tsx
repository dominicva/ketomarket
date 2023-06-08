'use client';

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { TwoSeventyRing } from 'react-svg-spinners';
import Card from './Card';
import { Button } from './buttons';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong, please try again.');
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/checkout/payment/completion`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(String(error.message));
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <Card>
      <h2 className="mb-8 text-2xl font-semibold">Complete your payment</h2>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e: any) => setEmail(e.target?.value)}
        />
        {/* @ts-expect-error */}
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          id="submit"
          // @ts-expect-error disabled prop missing from buttonTypes
          disabled={isLoading || !stripe || !elements}
          className="m-auto mb-4 mt-8 flex w-11/12 justify-center py-2"
        >
          {isLoading ? <TwoSeventyRing color="white" /> : 'Pay now'}
        </Button>
        {message && (
          <div
            id="payment-message"
            className="text-center text-lg font-semibold text-tertiary"
          >
            ❌ {message}
          </div>
        )}
      </form>
    </Card>
  );
}
