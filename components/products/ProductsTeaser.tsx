import { prisma } from '@/lib/db';
import ProductTeaser from './ProductTeaser';

export default async function ProductsTeaser() {
  const products = await prisma.product.findMany();

  return (
    <section className="p-4">
      <h2 className="mt-4 px-4 text-center text-2xl font-bold">
        Log in to order from our collection of{' '}
        <span className="text-tertiary">keto-friendly</span> products
      </h2>
      <div className="mt-8">
        <ul className="flex flex-col gap-8">
          {products.map(product => (
            <ProductTeaser key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
