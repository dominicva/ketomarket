import { Prisma } from '@prisma/client';

const productWithCategory = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    category: true,
  },
});

export type ProductWithCategory = Prisma.ProductGetPayload<
  typeof productWithCategory
>;

const categoryWithProducts = Prisma.validator<Prisma.CategoryArgs>()({
  include: {
    products: true,
  },
});

export type CategoryWithProducts = Prisma.CategoryGetPayload<
  typeof categoryWithProducts
>;
