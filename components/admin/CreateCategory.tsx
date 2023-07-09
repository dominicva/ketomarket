'use client';

import { FormEvent, useState, useEffect } from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { Button } from '@/components/buttons';
import { capitalize } from '@/lib/strings';

const initial = {
  name: '',
  description: '',
};

export default function CreateCategory() {
  const [formState, setFormState] = useState({ ...initial });
  const [categories, setCategories] = useState([] as string[]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch('/api/category');
      const { categories } = await res.json();
      return categories;
    };
    getCategories().then(data => setCategories(data));
  }, []);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormState({ ...formState, [name]: value });
    if (categories.includes(value)) setError(true);
    else setError(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });

    if (!res.ok) {
      alert(await res.json());
      return;
    }
    setFormState({ ...initial });
  };

  return (
    <section>
      <div className="m-auto max-w-xl">
        <Card as="section">
          <h2 className="mb-6 mt-4 text-lg font-semibold">
            Create New Category
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              required={true}
              labelText="Category name"
              id="name"
              type="text"
              value={formState.name}
              onChange={handleInputChange}
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="">Category description</label>
              <textarea
                name=""
                id=""
                required={true}
                value={formState.description}
                onChange={e =>
                  setFormState({ ...formState, description: e.target.value })
                }
                cols={30}
                rows={6}
                className="resize-none rounded border-2 p-2 focus-within:outline-secondary"
              ></textarea>
            </div>

            <Button
              intent={error ? 'disabled' : 'primary'}
              size="large"
              // @ts-expect-error
              disabled={error}
            >
              Create Category
            </Button>
            <p>
              {error ? (
                <span className="font-semibold text-accent">
                  {`"${capitalize(
                    formState.name
                  )}" is already a category. Please choose another name.`}
                </span>
              ) : null}
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}
