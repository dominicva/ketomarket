import Link from 'next/link';
import Button from './buttons/Button';
import { ShoppingCart } from 'react-feather';
import { prisma } from '@/lib/db';

interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export default async function Greetings({
  id,
  name,
}: Pick<UserSession, 'id' | 'name'>) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      carts: {
        include: {
          cartItems: true,
        },
      },
    },
  });

  const currentCartItems = user?.carts[0]?.cartItems?.length ?? 0;

  return (
    <section className="bg-off-white px-4 py-6">
      <hgroup>
        <h1 className="mb-6 text-2xl font-bold">Welcome, {name}</h1>
        <p className="mt-4 text-lg text-gray-600">
          Time to shop! We have a great selection of keto-friendly products.
        </p>
        <Link href="/profile/cart">
          <Button intent="secondary" className="mt-6 flex gap-2">
            <ShoppingCart />
            Cart ({currentCartItems})
          </Button>
        </Link>
      </hgroup>
    </section>
  );
}
