import { getServerSession } from 'next-auth';
import { Cart } from '@prisma/client';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import Card from '@/components/Card';
import CartItem from '@/components/cart/CartItem';
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
      <Card className="mt-4 bg-white">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <ul>
          {currentCart?.cartItems.length ? (
            currentCart.cartItems.map((cartItem: any) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </ul>
      </Card>
    </section>
  );
}
