import { getServerSession } from 'next-auth';
import { prisma } from './db';
import { authOptions } from './auth';
import type { CartWithItemsAndProducts, ServerSession } from '@/types';

export const getCurrentCart = async (
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

export const getCartTotal = (cart: CartWithItemsAndProducts): number => {
  let total = 0;

  for (const cartItem of cart.cartItems) {
    total += cartItem.product.price * cartItem.quantity;
  }

  return total;
};

export const getCartData = async () => {
  const session: ServerSession = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const cart = await getCurrentCart(String(userId));
  const cartTotal = cart ? getCartTotal(cart) : 0;

  return {
    data: {
      cart,
      cartTotal,
    },
  };
};
