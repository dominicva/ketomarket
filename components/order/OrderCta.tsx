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
      <form
        action="/api/create-payment-intent"
        method="POST"
        onClick={handleStartLoadingPayment}
        onLoad={handleStopLoadingPayment}
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
        onClick={handleStartLoadingReturnToCart}
        onLoad={handleStopLoadingReturnToCart}
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
