import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Button, GoToCart } from './buttons';
import type { UserSession } from '@/types';

export default async function Greetings({ id }: Pick<UserSession, 'id'>) {
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

  const isAdmin = user?.isAdmin ?? false;

  const currentCartItemsCount = user?.carts[0]?.cartItems?.length ?? 0;

  return (
    <section className="bg-off-white px-4 py-6 md:py-8 lg:py-12">
      <div className="m-auto max-w-5xl lg:px-6">
        <hgroup>
          <h1 className="mb-6 text-2xl font-bold">Welcome, {user?.name} 👋</h1>
          <p className="mt-4 text-lg text-gray-600">
            Time to shop! We have a great selection of keto-friendly products.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <GoToCart cartItemsCount={currentCartItemsCount} />
            {isAdmin ? (
              <Link href="/admin/dashboard">
                <Button size="medium" className="sm:mt-6">
                  Admin dashboard
                </Button>
              </Link>
            ) : null}
          </div>
        </hgroup>
      </div>
    </section>
  );
}
