'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Button } from '@/components/buttons';

export function OrderCta({ cart }: { cart: any }) {
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isLoadingReturnToCart, setIsLoadingReturnToCart] = useState(false);
  const emptyCart = !cart?.cartItems.length;

  const handlePaymentClick = () => {
    setIsLoadingPayment(true);
  };

  const handlePaymentNavigationComplete = () => {
    setIsLoadingPayment(false);
  };

  const handleReturnToCartClick = () => {
    setIsLoadingReturnToCart(true);
  };

  const handleReturnToCartNavigationComplete = () => {
    setIsLoadingReturnToCart(false);
  };

  return (
    <>
      <form
        action="/api/create-payment-intent"
        method="POST"
        onClick={handlePaymentClick}
        onLoad={handlePaymentNavigationComplete}
      >
        <Button
          className="m-auto mt-8 flex w-11/12 items-center justify-center"
          intent={emptyCart ? 'disabled' : 'primary'}
          size="large"
        >
          {isLoadingPayment ? (
            <TwoSeventyRing color="white" />
          ) : (
            <span>Proceed to payment</span>
          )}
        </Button>
      </form>
      <Link
        href={`/${emptyCart ? 'home' : 'profile/cart'}`}
        passHref
        onClick={handleReturnToCartClick}
        onLoad={handleReturnToCartNavigationComplete}
      >
        <Button
          className="m-auto mt-8 flex w-11/12 items-center justify-center"
          intent="tertiary"
          size="large"
        >
          {isLoadingReturnToCart ? (
            <TwoSeventyRing color="#09624B" />
          ) : (
            <span>{emptyCart ? 'Back to store' : 'Return to Cart'}</span>
          )}
        </Button>
      </Link>
    </>
  );
}
