'use client';

import { FormEvent, useState, useEffect } from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { Button } from '@/components/buttons';
import { capitalize } from '@/lib/strings';

const initial = {
  name: '',
  category: '',
  description: '',
  price: '',
  image: '',
};

export default function ProductAdmin() {
  const [formState, setFormState] = useState({ ...initial });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('/api/category');
      const { categories } = await res.json();
      return categories;
    };
    getCategories().then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });
    console.log('create new product res:', res);
    if (!res.ok) {
      alert((await res.json()).message);
      return;
    }
    setFormState({ ...initial });
  };

  return (
    <section>
      <div className="m-auto max-w-xl">
        <Card as="section">
          <h2 className="mb-6 mt-4 text-lg font-semibold">
            Create New Product
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              value={formState.price}
              onChange={e =>
                setFormState({ ...formState, price: e.target.value })
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

            <Button size="large">Create Product</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
