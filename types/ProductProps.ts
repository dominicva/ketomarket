import { Product, Category } from '@prisma/client';
import { ProductWithCategory } from './ProductWithCategory';

export type ProductProps = Pick<Product, 'id' | 'name' | 'price' | 'image'> & {
  category: ProductWithCategory['category'];
};

export type ProductPropsAPI = Pick<
  Product,
  'id' | 'name' | 'price' | 'image'
> & {
  category: string;
};
