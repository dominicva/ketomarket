import { prisma } from './db';
import type { CartWithItemsAndProducts } from '@/types';

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
