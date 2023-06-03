import Link from 'next/link';
import Button from './buttons/Button';
import { ShoppingCart } from 'react-feather';
import { prisma } from '@/lib/db';

export default async function Greetings({ user }: any) {
  const carts = await prisma.cart.findMany({
    where: {
      userId: user.id,
    },
    include: {
      cartItems: true,
    },
  });

  const currentCartItems = carts[0].cartItems;

  return (
    <section className="bg-off-white px-4 py-6">
      <hgroup>
        <h1 className="mb-6 text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="mt-4 text-lg text-gray-600">
          Time to shop! We have a great selection of keto-friendly products.
        </p>
        <Link href="/profile/cart">
          <Button intent="secondary" className="mt-6 flex gap-2">
            <ShoppingCart />
            Cart ({currentCartItems.length})
          </Button>
        </Link>
      </hgroup>
    </section>
  );
}
