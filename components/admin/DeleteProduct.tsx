'use client';

import { FormEvent, useState, useEffect } from 'react';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import { capitalize } from '@/lib/strings';
import { ProductAPI } from '@/types';

const initial = {
  name: '',
  category: '',
  description: '',
  price: '',
  image: '',
};

export default function DeleteProduct() {
  const [formState, setFormState] = useState({ ...initial });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch('/api/product');
      return await res.json();
    };
    getProducts().then(data => setProducts(data));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedProductName = e.currentTarget.product.value;

    const selectedProduct: ProductAPI | undefined = products.find(
      (product: ProductAPI) => product.name === selectedProductName
    );

    if (!selectedProduct) {
      alert('No product selected');
      return;
    }

    const { id: productId } = selectedProduct;

    const res = await fetch(`/api/product?id=${productId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const resData = await res.json();
      console.error('resData', resData);
      return;
    }
  };

  return (
    <section>
      <div className="m-auto max-w-sm">
        <Card as="section">
          <h2 className="mb-6 mt-4 text-lg font-semibold">Delete Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="category">Product</label>
            <select
              name="product"
              id="product"
              required={true}
              value={formState.category}
              onChange={e =>
                setFormState({ ...formState, category: e.target.value })
              }
              className="rounded border-2 p-2 focus-within:outline-secondary"
            >
              <option value="">Select a product</option>
              {products.length > 0 ? (
                products.map((product: ProductAPI) => (
                  <option key={product.id} value={product.name}>
                    {capitalize(product.name)}
                  </option>
                ))
              ) : (
                <option value="">No categories found</option>
              )}
            </select>

            <Button size="large">Delete Product</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
