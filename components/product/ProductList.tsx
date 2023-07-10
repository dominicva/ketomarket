import { capitalize } from '@/lib/strings';
import Product from './ProductCard';
import type { ProductPropsAPI } from '@/types';

export default function ProductList({
  products,
}: {
  products: ProductPropsAPI[];
}) {
  const categories = products.reduce((acc, product) => {
    if (acc[product.category]) {
      acc[product.category].push(product);
    } else {
      acc[product.category] = [product];
    }
    return acc;
  }, {} as Record<string, ProductPropsAPI[]>);

  const items: any = [];

  for (const [category, products] of Object.entries(categories)) {
    items.push(
      <h3
        key={category}
        className="mt-8 basis-full text-xl font-semibold sm:col-span-2 md:col-span-3"
      >
        {capitalize(category)} ({products.length})
      </h3>
    );
    products.forEach(product => {
      items.push(
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      );
    });
  }

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
