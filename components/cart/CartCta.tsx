'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Button } from '../buttons';

export function CartCta({ emptyCart }: { emptyCart: boolean }) {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [isLoadingContinueShopping, setIsLoadingContinueShopping] =
    useState(false);

  const handleCheckoutClick = () => {
    setIsLoadingCheckout(true);
  };

  const handleContinueShoppingClick = () => {
    setIsLoadingContinueShopping(true);
  };

  const handleCheckoutNavigationComplete = () => {
    setIsLoadingCheckout(false);
  };

  const handleContinueShoppingNavigationComplete = () => {
    setIsLoadingContinueShopping(false);
  };

  return (
    <div className="mt-12 flex flex-col gap-6">
      <Link
        href="/home"
        passHref
        onClick={handleContinueShoppingClick}
        onLoad={handleContinueShoppingNavigationComplete}
        className="flex items-center justify-center"
      >
        <Button
          intent="tertiary"
          size="large"
          className="flex w-11/12 items-center justify-center"
        >
          {isLoadingContinueShopping ? (
            <TwoSeventyRing color="#09624B" />
          ) : (
            <span>Continue Shopping</span>
          )}
        </Button>
      </Link>
      <Link
        href={`/checkout`}
        passHref
        onClick={handleCheckoutClick}
        onLoad={handleCheckoutNavigationComplete}
        className="flex items-center justify-center"
      >
        <Button
          intent={emptyCart ? 'disabled' : 'primary'}
          size="large"
          className="flex w-11/12 items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {isLoadingCheckout ? (
            <TwoSeventyRing color="white" />
          ) : (
            <span>Checkout</span>
          )}
        </Button>
      </Link>
    </div>
  );
}
