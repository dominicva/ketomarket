import { prisma } from './db';
import { ProductAPI } from '@/types/ProductAPI';
import { ProductWithCategory } from '@/types';

export const getProductById = async (id: string) => {
  const productFromDb = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return productFromDb as ProductWithCategory;
};

export const getProducts = async (): Promise<ProductAPI[]> => {
  const productsFromDb = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  // @ts-ignore
  return productsFromDb
    .filter(product => !product.deletedAt)
    .map(product => {
      return {
        id: product.id,
        category: product.category.name,
        description: product.description,
        price: product.price,
        name: product.name,
        image: product.image,
      };
    });
};
