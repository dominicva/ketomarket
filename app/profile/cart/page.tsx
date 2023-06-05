// 'use client';

import { getServerSession } from 'next-auth';
import { Cart } from '@prisma/client';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { capitalize } from '@/lib/strings';
import type { ServerSession, CartWithItemsAndProducts } from '@/types';
import Card from '@/components/Card';
import CartItem from '@/components/cart/CartItem';

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
      <Card className="mt-4 bg-white">
        <h2 className="text-xl font-semibold">Cart</h2>
        <ul>
          {currentCart
            ? currentCart.cartItems.map((cartItem: any) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))
            : null}
        </ul>
      </Card>
    </section>
  );
}
