import { Prisma } from '@prisma/client';

const categoryWithProducts = Prisma.validator<Prisma.CategoryArgs>()({
  include: {
    products: true,
  },
});

export type CategoryWithProducts = Prisma.CategoryGetPayload<
  typeof categoryWithProducts
>;
