'use client';

import { useRouter } from 'next/navigation';
import { Plus } from 'react-feather';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import type { ProductProps } from '@/types';

export default async function Product({
  id,
  name,
  description,
  price,
  category,
}: ProductProps) {
  const router = useRouter();

  const addToCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({
        productId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.refresh();
  };

  return (
    <Card className="relative bg-off-white">
      <h3 className="text-xl">{capitalize(name)}</h3>
      <h5 className="text-sm font-bold text-secondary">
        {capitalize(category.name)}
      </h5>
      <h4 className="mb-2 font-semibold">${price}</h4>
      <p>{description}</p>

      <Button
        intent="tertiary"
        size="small"
        className="absolute right-4 top-4 mt-4 flex gap-2"
        onClick={addToCart}
      >
        <Plus />
        Add to cart
      </Button>
    </Card>
  );
}
