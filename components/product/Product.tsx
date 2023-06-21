'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Plus, CheckCircle } from 'react-feather';
import { capitalize } from '@/lib/strings';
import { debounce } from '@/lib/debounce';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import type { ProductProps } from '@/types';

export default function Product({
  id,
  name,
  price,
  image,
  category,
}: ProductProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const productTitle = capitalize(name);

  useEffect(() => {
    const handleResize = debounce(() => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const addToCartButton =
    screenSize.width > 680 ? (
      <Button
        intent="primary"
        size="round"
        onClick={addToCart}
        className="flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10"
      >
        {loading ? <TwoSeventyRing color="white" /> : <Plus size={18} />}
        <span className="sr-only">Add to cart</span>
      </Button>
    ) : (
      <Button
        intent="primary"
        size="round"
        onClick={addToCart}
        className="flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10"
      >
        {loading ? <TwoSeventyRing color="white" /> : <Plus size={18} />}
        <span className="sr-only">Add to cart</span>
      </Button>
    );

  return (
    <Card className="relative basis-[46%] pb-2 pl-0 pr-0 pt-0 transition duration-200 ease-in-out hover:translate-y-1 hover:shadow-lg sm:pb-4">
      <Image
        src={image ?? '/'}
        alt={name}
        width={200}
        height={200}
        className="m-auto mb-4 w-full rounded-md rounded-b-none"
      />

      <div className="px-4 pb-2">
        <h3 className="text-xl">{productTitle}</h3>
        <h5 className="text-sm font-bold text-secondary">
          {capitalize(category.name)}
        </h5>
        <h4 className="mb-2 font-semibold">${price}</h4>
        <div className="absolute right-2 top-2 flex items-center">
          {success ? (
            <Button
              intent="primary"
              onClick={() => router.push(`/profile/cart`)}
              className="flex items-center gap-2 bg-primary px-4"
            >
              <CheckCircle size={20} />
              View cart
            </Button>
          ) : (
            addToCartButton
          )}
        </div>
      </div>
    </Card>
  );
}
