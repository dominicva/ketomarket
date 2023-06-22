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

  // const handleClick = async () => {
  //   const res = await fetch('/api/create-payment-intent', {
  //     method: 'POST',
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };

  return (
    <>
      <form
        action="/api/create-payment-intent"
        method="POST"
        onClick={handleStartLoadingPayment}
        onLoad={handleStopLoadingPayment}
        className="max-w-xl"
      >
        <Button
          className="m-auto mt-8 flex w-11/12 items-center justify-center sm:w-2/3"
          intent={emptyCart ? 'disabled' : 'primary'}
          size="large"
          // @ts-expect-error type not in ButtonProps
          type="submit"
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
