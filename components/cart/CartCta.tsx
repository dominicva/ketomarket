'use client';

import Link from 'next/link';
import { TwoSeventyRing } from 'react-svg-spinners';
import { useNavigationLoading } from '@/lib/hooks/useNavigationLoading';
import { Button } from '../buttons';

export function CartCta({ emptyCart }: { emptyCart: boolean }) {
  const {
    isLoading: isLoadingCheckout,
    handleStartLoading: handleStartLoadingCheckout,
    handleStopLoading: handleStopLoadingCheckout,
  } = useNavigationLoading();

  const {
    isLoading: isLoadingContinueShopping,
    handleStartLoading: handleStartLoadingContinueShopping,
    handleStopLoading: handleStopLoadingContinueShopping,
  } = useNavigationLoading();

  return (
    <div className="mt-12 flex max-w-xl flex-col gap-6">
      <Link
        href="/home"
        passHref
        onClick={handleStartLoadingContinueShopping}
        onLoad={handleStopLoadingContinueShopping}
        className="flex items-center justify-center"
      >
        <Button
          intent="tertiary"
          size="large"
          className="flex w-11/12 items-center justify-center sm:w-2/3"
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
        onClick={handleStartLoadingCheckout}
        onLoad={handleStopLoadingCheckout}
        className="flex items-center justify-center"
      >
        <Button
          intent={emptyCart ? 'disabled' : 'primary'}
          size="large"
          className="flex w-11/12 items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-2/3"
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
