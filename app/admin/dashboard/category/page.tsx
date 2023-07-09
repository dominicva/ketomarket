'use client';

import { useState } from 'react';
import { Button } from '@/components/buttons';
import CreateCategory from '@/components/admin/CreateCategory';
import UpdateCategory from '@/components/admin/UpdateCategory';

function DeleteCategory() {
  return <h1>delete</h1>;
}

export default function CategoryAdmin() {
  const [crudMethod, setCrudMethod] = useState('create');

  const child =
    crudMethod === 'create' ? (
      <CreateCategory />
    ) : crudMethod === 'update' ? (
      <UpdateCategory />
    ) : (
      <DeleteCategory />
    );

  return (
    <section className="p-4">
      <div className="m-auto max-w-xl">
        <h1 className="mb-4 text-2xl font-semibold text-secondary">Category</h1>
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
