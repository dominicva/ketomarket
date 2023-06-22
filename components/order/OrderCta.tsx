'use client';

import Link from 'next/link';
import { TwoSeventyRing } from 'react-svg-spinners';
import { useNavigationLoading } from '@/lib/hooks/useNavigationLoading';
import { Button } from '@/components/buttons';

export function OrderCta({ cart }: { cart: any }) {
  const {
    isLoading: isLoadingPayment,
    handleStartLoading: handleStartLoadingPayment,
    handleStopLoading: handleStopLoadingPayment,
  } = useNavigationLoading();
  const {
    isLoading: isLoadingReturnToCart,
    handleStartLoading: handleStartLoadingReturnToCart,
    handleStopLoading: handleStopLoadingReturnToCart,
  } = useNavigationLoading();
  const emptyCart = !cart?.cartItems.length;

  return (
    <>
      <Button
        className="m-auto mt-8 flex w-11/12 items-center justify-center sm:w-2/3"
        intent={emptyCart ? 'disabled' : 'primary'}
        size="large"
      >
        <form
          action="/api/create-payment-intent"
          method="POST"
          onClick={handleStartLoadingPayment}
          onLoad={handleStopLoadingPayment}
          className="max-w-xl"
        >
          {isLoadingPayment ? (
            <TwoSeventyRing color="white" />
          ) : (
            <span>Proceed to payment</span>
          )}
        </form>
      </Button>
      <Link
        href={`/${emptyCart ? 'home' : 'profile/cart'}`}
        passHref
        onClick={handleStartLoadingReturnToCart}
        onLoad={handleStopLoadingReturnToCart}
        className="block max-w-xl"
      >
        <Button
          className="m-auto mt-8 flex w-11/12 items-center justify-center sm:w-2/3"
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
