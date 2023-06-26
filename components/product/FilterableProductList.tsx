'use client';

import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import type { ProductPropsAPI } from '@/types';

export default function FilterableProductList({
  products,
}: {
  products: ProductPropsAPI[];
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
  }, [searchTerm]);

  return (
    <section className="mt-12">
      <h2 className="m-auto max-w-5xl p-4 text-2xl font-semibold lg:p-8">
        Products
      </h2>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <ProductList products={filteredProducts} />
    </section>
  );
}
