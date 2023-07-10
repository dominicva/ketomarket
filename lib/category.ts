import { prisma } from './db';
import type { CategoryWithProducts } from '@/types';

export const getCategories = async (): Promise<string[]> => {
  const categories = await prisma.category.findMany();
  return categories.map(category => category.name);
};

export const getCategoriesWithDescriptions = async (): Promise<
  Record<string, string>[]
> => {
  const categories = await prisma.category.findMany();
  return categories.map(
    category =>
      ({
        name: category.name,
        description: category.description,
      } as Record<string, string>)
  );
};

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
