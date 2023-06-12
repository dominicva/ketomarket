import Link from 'next/link';
import { Button } from '@/components/buttons';

export function OrderCta({ cart }: { cart: any }) {
  const emptyCart = !cart?.cartItems.length;

  return (
    <>
      <form action="/api/create-payment-intent" method="POST">
        <Button
          className="m-auto mt-8 block w-11/12"
          intent={emptyCart ? 'disabled' : 'primary'}
          size="large"
        >
          Proceed to payment
        </Button>
      </form>
      <Link href={`/${emptyCart ? 'home' : 'cart'}`}>
        <Button
          className="m-auto mt-8 block w-11/12"
          intent="tertiary"
          size="large"
        >
          {emptyCart ? 'Back to store' : 'Return to Cart'}
        </Button>
      </Link>
    </>
  );
}
