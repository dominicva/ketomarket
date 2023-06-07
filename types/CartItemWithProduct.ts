import { Prisma } from '@prisma/client';

const cartItemWithItemProduct = Prisma.validator<Prisma.CartItemArgs>()({
  include: {
    product: true,
  },
});

export type CartItemWithProduct = Prisma.CartItemGetPayload<
  typeof cartItemWithItemProduct
>;
