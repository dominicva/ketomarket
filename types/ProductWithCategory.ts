import { Prisma } from '@prisma/client';

const productWithCategory = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    category: true,
  },
});

export type ProductWithCategory = Prisma.ProductGetPayload<
  typeof productWithCategory
>;
