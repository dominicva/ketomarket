'use client';

import { useState } from 'react';
import { Button } from '@/components/buttons';
import CreateProduct from '@/components/admin/CreateProduct';
import UpdateProduct from '@/components/admin/UpdateProduct';
import DeleteProduct from './DeleteProduct';

export default function ProductAdmin() {
  const [crudMethod, setCrudMethod] = useState('create');

  const child =
    crudMethod === 'create' ? (
      <CreateProduct />
    ) : crudMethod === 'update' ? (
      <UpdateProduct />
    ) : (
      <DeleteProduct />
    );
  return (
    <section className="p-4">
      <div className="m-auto max-w-xl">
        <h1 className="mb-4 text-2xl font-semibold text-secondary">Product</h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Button size="small" onClick={() => setCrudMethod('create')}>
                Create
              </Button>
            </li>
            <li>
              <Button
                intent="tertiary"
                size="small"
                onClick={() => setCrudMethod('update')}
                className="py-[0.4rem]"
              >
                Update
              </Button>
            </li>
            <li>
              <Button
                intent="secondary"
                size="small"
                onClick={() => setCrudMethod('delete')}
              >
                Delete
              </Button>
            </li>
          </ul>
        </nav>
        {child}
      </div>
    </section>
  );
}
