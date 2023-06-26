'use client';

import { Suspense } from 'react';
import { capitalize } from '@/lib/strings';
import Product from './Product';
import ProductSkeleton from './ProductSkeleton';
import type { ProductPropsAPI } from '@/types';

export default function ProductList({
  products,
}: {
  products: ProductPropsAPI[];
}) {
  const items: any = [];
  let lastCategory: null | string = null;

  products.forEach(product => {
    if (product.category !== lastCategory) {
      const categoryLength = products.filter(
        p => p.category === product.category
      ).length;

      items.push(
        <h3
          key={product.category}
          className="mt-8 basis-full text-xl font-semibold sm:col-span-2 md:col-span-3"
        >
          {capitalize(product.category)} ({categoryLength})
        </h3>
      );
    }
    items.push(
      <Suspense key={product.id} fallback={<ProductSkeleton />}>
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      </Suspense>
    );
    lastCategory = product.category;
  });

  return (
    <div className="m-auto max-w-5xl p-4 lg:p-8">
      <section className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {items}
        </div>
      </section>
    </div>
  );
}
