'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Plus, CheckCircle } from 'react-feather';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import type { ProductPropsAPI } from '@/types';

export default function Product({
  id,
  name,
  price,
  image,
  category,
}: ProductPropsAPI) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const productTitle = capitalize(name);

  const addToCart = async () => {
    setLoading(true);

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
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <Card
      as="article"
      className="relative basis-[46%] pb-2 pl-0 pr-0 pt-0 transition duration-200 ease-in-out hover:translate-y-1 hover:shadow-lg sm:pb-4"
    >
      <Link href={`/product/${id}`} passHref>
        <Image
          src={image ?? '/'}
          alt={name}
          width={200}
          height={200}
          className="m-auto mb-4 w-full rounded-md rounded-b-none"
        />
      </Link>
      <div className="px-4 pb-2">
        <Link href={`/product/${id}`} passHref>
          <h3 className="text-xl">{productTitle}</h3>
          <h5 className="text-sm font-bold text-secondary">
            {capitalize(category)}
          </h5>
          <h4 className="mb-2 font-semibold">${price}</h4>
        </Link>

        <div className="absolute right-2 top-2 flex items-center">
          {success ? (
            <Button
              intent="primary"
              onClick={() => router.push(`/profile/cart`)}
              className="z-10 flex items-center gap-2 bg-primary px-4"
            >
              <CheckCircle size={20} />
              View cart
            </Button>
          ) : (
            <Button
              intent="primary"
              size="round"
              onClick={addToCart}
              className="z-10 flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10"
            >
              {loading ? <TwoSeventyRing color="white" /> : <Plus size={18} />}
              <span className="sr-only">Add to cart</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
