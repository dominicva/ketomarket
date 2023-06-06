import { Product } from '@prisma/client';
import { ProductWithCategory } from './ProductWithCategory';

export type ProductProps = Pick<
  Product,
  'id' | 'name' | 'description' | 'price'
> & {
  category: ProductWithCategory['category'];
};
