'use client';

import { FormEvent, useState, useEffect, SetStateAction } from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { Button } from '@/components/buttons';
import { capitalize } from '@/lib/strings';
import type { ProductProps } from '@/types';
import { ProductAPI } from '@/types/ProductAPI';

const initial: ProductAPI = {
  id: '',
  name: '',
  category: '',
  description: '',
  price: '' as unknown as number,
  image: '',
};

export default function UpdateProduct() {
  const [formState, setFormState] = useState({ ...initial });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch('/api/product');
      const productsData = await res.json();
      return productsData;
    };

    const getCategories = async () => {
      const res = await fetch('/api/category');
      const { categories } = await res.json();
      return categories;
    };

    getProducts().then(data => setProducts(data));
    getCategories().then(data => setCategories(data));
  }, []);

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const product = products.find(
      // @ts-ignore
      (product: ProductAPI) => product.name === e.target.value
    );
    setFormState(product as unknown as SetStateAction<ProductAPI>);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/product', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });

    if (!res.ok) {
      console.error(await res.json());
      return;
    }

    setFormState({ ...initial });
  };

  return (
    <section>
      <div className="m-auto max-w-xl">
        <Card as="section">
          <h2 className="mb-6 mt-4 text-lg font-semibold">Update Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="category">Select product</label>
            <select
              name="category"
              id="category"
              required={true}
              value={formState.name}
              onChange={handleSelectChange}
              className="rounded border-2 p-2 focus-within:outline-secondary"
            >
              <option value="">Select a product</option>
              {products.length > 0 ? (
                products.map((product: ProductProps) => (
                  <option key={product.id} value={product.name}>
                    {capitalize(product.name)}
                  </option>
                ))
              ) : (
                <option value="">No categories found</option>
              )}
            </select>
            <Input
              required={true}
              labelText="Product name"
              id="name"
              type="text"
              value={formState.name}
              onChange={e =>
                setFormState({ ...formState, name: e.target.value })
              }
            />

            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              required={true}
              value={formState.category}
              onChange={e =>
                setFormState({ ...formState, category: e.target.value })
              }
              className="rounded border-2 p-2 focus-within:outline-secondary"
            >
              <option value="">Select a category</option>
              {categories.length > 0 ? (
                categories.map((category: any) => (
                  <option key={category} value={category}>
                    {capitalize(category)}
                  </option>
                ))
              ) : (
                <option value="">No categories found</option>
              )}
            </select>

            <div className="flex flex-col gap-2">
              <label htmlFor="">Product description</label>
              <textarea
                name=""
                id=""
                required={true}
                value={formState.description}
                onChange={e =>
                  setFormState({ ...formState, description: e.target.value })
                }
                cols={30}
                rows={10}
                className="resize-none rounded border-2 p-2 focus-within:outline-secondary"
              ></textarea>
            </div>

            <Input
              required={true}
              labelText="Product price"
              id="price"
              type="number"
              value={String(formState.price)}
              onChange={e =>
                setFormState({ ...formState, price: Number(e.target.value) })
              }
            />

            <Input
              required={true}
              labelText="Image URL"
              id="image"
              type="text"
              value={formState.image}
              onChange={e =>
                setFormState({ ...formState, image: e.target.value })
              }
              autocomplete="photo"
            />

            <Button size="large">Save</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
