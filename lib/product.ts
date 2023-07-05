import { prisma } from './db';
import { ProductAPI } from '@/types/ProductAPI';

export const getProductById = async (id: string) => {
  const productFromDb = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return productFromDb;
};

export const getProducts = async (): Promise<ProductAPI[]> => {
  const productsFromDb = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  return productsFromDb.map(product => {
    return {
      id: product.id,
      category: product.category.name,
      price: product.price,
      name: product.name,
      image: product.image,
    };
  });
};
