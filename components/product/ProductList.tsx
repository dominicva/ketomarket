import { Suspense } from 'react';
import { capitalize } from '@/lib/strings';
import { getCategoriesWithProducts } from '@/lib/category';
import Product from './Product';
import ProductSkeleton from './ProductSkeleton';
import type { CategoryWithProducts } from '@/types';

export default async function ProductList() {
  const categories: CategoryWithProducts[] =
    (await getCategoriesWithProducts()) ?? [];

  return (
    <div className="p-4">
      <h2 className="my-4 text-2xl font-semibold">Products</h2>
      <section className="flex flex-col gap-8">
        {categories.map(category => (
          <div key={category.id}>
            <h3 className="mb-4 text-xl font-semibold">
              {capitalize(category.name)} ({category.products.length})
            </h3>
            <div className="flex flex-wrap gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
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
