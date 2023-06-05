import { getServerSession } from 'next-auth';
import { Cart } from '@prisma/client';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import type { ServerSession, CartWithItemsAndProducts } from '@/types';

const getCurrentCart = async (
  userId: string | undefined
): Promise<CartWithItemsAndProducts | null> => {
  try {
    const carts = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return carts[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function Cart() {
  const session: ServerSession = await getServerSession(authOptions);
  const currentCart = await getCurrentCart(session?.user.id);

  return (
    <section>
      <h2>Cart</h2>
      <ul>
        {currentCart
          ? currentCart.cartItems.map((cartItem: any) => (
              <li key={cartItem.id}>{cartItem.product.name}</li>
            ))
          : null}
      </ul>
    </section>
  );
}
