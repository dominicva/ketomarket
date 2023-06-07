import { Suspense } from 'react';
import { prisma } from '@/lib/db';
import { capitalize } from '@/lib/strings';
import Product from './Product';
import ProductSkeleton from './ProductSkeleton';
import type { CategoryWithProducts } from '@/types';

export default async function ProductList() {
  const categories: CategoryWithProducts[] = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  return (
    <div className="p-4">
      <h2 className="my-4 text-2xl font-semibold">Products</h2>
      <section className="flex flex-col gap-8">
        {categories.map(category => (
          <div key={category.id}>
            <h3 className="mb-4 text-xl font-semibold">
              {capitalize(category.name)} ({category.products.length})
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.products.map(product => (
                <Suspense key={product.id} fallback={<ProductSkeleton />}>
                  <Product
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    category={category}
                  />
                </Suspense>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
