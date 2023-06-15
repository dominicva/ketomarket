import { prisma } from '@/lib/db';
import { GoToCart } from './buttons';

interface UserSession {
  id: string;
  name: string;
  email: string;
  image?: string;
}

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

  const currentCartItemsCount = user?.carts[0]?.cartItems?.length ?? 0;

  return (
    <section className="bg-off-white px-4 py-6">
      <hgroup>
        <h1 className="mb-6 text-2xl font-bold">Welcome, {user?.name} 👋</h1>
        <p className="mt-4 text-lg text-gray-600">
          Time to shop! We have a great selection of keto-friendly products.
        </p>
        <GoToCart cartItemsCount={currentCartItemsCount} />
      </hgroup>
    </section>
  );
}
