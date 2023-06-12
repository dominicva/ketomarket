import Link from 'next/link';
import { Button } from '@/components/buttons';

export function OrderCta() {
  return (
    <>
      <form action="/api/create-payment-intent" method="POST">
        <Button
          className="m-auto mt-8 block w-11/12"
          intent="primary"
          size="large"
        >
          Proceed to payment
        </Button>
      </form>
      <Link href="/profile/cart">
        <Button
          className="m-auto mt-8 block w-11/12"
          intent="tertiary"
          size="large"
        >
          Back to cart
        </Button>
      </Link>
    </>
  );
}
