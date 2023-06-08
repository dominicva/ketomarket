import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCurrentCart, getCartTotal } from '@/lib/cart';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import type { ServerSession } from '@/types';
import { Button } from '@/components/buttons';
import Link from 'next/link';

export default async function Checkout() {
  const session: ServerSession = await getServerSession(authOptions);
  const userId = session?.user.id;
  const cart = await getCurrentCart(userId);
  const total = cart ? getCartTotal(cart) : 0;

  return (
    <div className="p-4">
      <Card className="mt-4 bg-white">
        <h2 className="text-2xl font-semibold">Checkout</h2>
        <h3 className="mt-6 text-xl">Review your order</h3>
        <section className="mt-6">
          {cart?.cartItems.map(item => (
            <div
              key={item.id}
              className="mt-4 flex items-center justify-between border-b-2 pb-4"
            >
              <div className="flex items-center">
                <Image
                  src={String(item.product.image)}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-md object-cover"
                  width={64}
                  height={64}
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold">
                    {capitalize(item.product.name)}
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <h5 className="border-b-2 pb-1 font-semibold">Quantity</h5>
                  <p className="mr-4 mt-2 text-lg">{item.quantity}</p>
                </div>
                <div className="flex flex-col">
                  <h5 className="border-b-2 pb-1 font-semibold">Total</h5>
                  <p className="mt-2 text-lg font-semibold">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </Card>
      <Card className="mt-4 bg-white">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="mt-6 flex justify-between">
          <p className="text-lg">Subtotal</p>
          <p className="text-lg">${total.toFixed(2)}</p>
        </div>
        <div className="mt-6 flex justify-between border-b-4 border-primary pb-6">
          <p className="text-lg">Shipping</p>
          <p className="text-lg">Free</p>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold">${total.toFixed(2)}</p>
        </div>
      </Card>
      <Link href="/checkout/payment">
        <Button
          className="m-auto mt-8 block w-11/12"
          intent="primary"
          size="large"
        >
          Proceed to payment
        </Button>
      </Link>
      <Link href="/home">
        <Button
          className="m-auto mt-8 block w-11/12"
          intent="tertiary"
          size="large"
        >
          Return to store
        </Button>
      </Link>
    </div>
  );
}
