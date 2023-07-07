'use client';

import { useState, useEffect, Suspense } from 'react';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import FilterableProductListSkeleton from '../skeletons/FilterableProductListSkeleton';
// TODO: make TypeScript happy
// import type { ProductPropsAPI, ProductAPI } from '@/types';

export default function FilterableProductList({
  products,
}: {
  products: any[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([...products]);

  useEffect(() => {
    const results = products.filter(
      product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <Suspense
      fallback={
        <FilterableProductListSkeleton productCount={products.length} />
      }
    >
      <section className="mt-8">
        <h2 className="m-auto max-w-5xl p-4 text-2xl font-semibold lg:p-8">
          Products
        </h2>
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <ProductList products={filteredProducts} />
      </section>
    </Suspense>
  );
}
