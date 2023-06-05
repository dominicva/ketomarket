import { Prisma } from '@prisma/client';

const cartWithItemsAndProducts = Prisma.validator<Prisma.CartArgs>()({
  include: {
    cartItems: {
      include: {
        product: true,
      },
    },
  },
});

export type CartWithItemsAndProducts = Prisma.CartGetPayload<
  typeof cartWithItemsAndProducts
>;
