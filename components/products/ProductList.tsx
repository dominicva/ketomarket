import { prisma } from '@/lib/db';
import Product from './Product';
import type { ProductWithCategory } from '@/types/ProductWithCategory';

export default async function ProductList() {
  const products: ProductWithCategory[] = await prisma.product.findMany({
    include: {
      category: true,
    },
  });

  return (
    <div className="p-4">
      <h2 className="my-4 text-2xl font-semibold">Products</h2>
      <section className="flex flex-col gap-8">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </section>
    </div>
  );
}
