import { prisma } from './db';
import type { CartWithItemsAndProducts } from '@/types';
import { getUserFromDb } from './user';

// export const addToCart = async (productId: string) => {
//   const user = await getUserFromDb();
//   try {
//     const existingCart = await prisma.cart.findFirst({
//       where: {
//         userId: user?.id,
//       },
//     });

//     if (existingCart) {
//       const existingCartItem = await prisma.cartItem.findFirst({
//         where: {
//           cartId: existingCart?.id,
//           productId,
//         },
//       });

//       if (existingCartItem) {
//         await prisma.cartItem.update({
//           where: {
//             id: existingCartItem.id,
//           },
//           data: {
//             quantity: existingCartItem.quantity + 1,
//           },
//         });
//       } else {
//         await prisma.cartItem.create({
//           data: {
//             cartId: existingCart.id,
//             productId,
//             quantity: 1,
//           },
//         });
//       }
//     } else {
//       const newCart = await prisma.cart.create({
//         data: {
//           userId: user?.id,
//           cartItems: {
//             create: {
//               productId,
//               quantity: 1,
//             },
//           },
//         },
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const getCurrentCart =
  async (): Promise<CartWithItemsAndProducts | null> => {
    const user = await getUserFromDb();
    try {
      const carts = await prisma.cart.findMany({
        where: {
          userId: user?.id,
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
  const cart = await getCurrentCart();
  const cartTotal = cart ? getCartTotal(cart) : 0;

  return {
    data: {
      cart,
      cartTotal,
    },
  };
};

export const deleteCarts = async (userId: string | undefined) => {
  const currentCart = await getCurrentCart();
  try {
    const deletedCartItems = await prisma.cartItem.deleteMany({
      where: { cartId: currentCart?.id },
    });

    const deletedCarts = await prisma.cart.deleteMany({
      where: { userId },
    });

    return {
      deletedCarts,
      deletedCartItems,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCartItemId = async (productId: string) => {
  const currentCart = await getCurrentCart();
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId: currentCart?.id,
      productId,
    },
  });

  return cartItem?.id;
};
