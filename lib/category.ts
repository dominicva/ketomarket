import { prisma } from './db';
import type { CategoryWithProducts } from '@/types';

export const getCategoriesWithProducts = async (): Promise<
  CategoryWithProducts[] | null
> => {
  try {
    return await prisma.category.findMany({
      include: {
        products: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
