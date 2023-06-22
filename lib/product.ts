import { prisma } from './db';

export const getProducts = async () => {
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
