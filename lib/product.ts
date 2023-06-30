import { prisma } from './db';

export const getProductById = async (id: string) => {
  const productFromDb = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  // return {
  //   id: productFromDb?.id,
  //   category: productFromDb?.category.name,
  //   price: productFromDb?.price,
  //   name: productFromDb?.name,
  //   image: productFromDb?.image,
  // }
  return productFromDb;
};

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
