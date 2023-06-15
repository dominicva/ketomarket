'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'react-feather';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Button } from '@/components/buttons';

export function GoToCart({ cartItemsCount }: { cartItemsCount: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  const handleNavigationComplete = () => {
    setIsLoading(false);
  };

  return (
    <Link
      href="/profile/cart"
      passHref
      onClick={handleClick}
      onLoad={handleNavigationComplete}
    >
      <Button intent="secondary" className="mt-6 flex gap-2">
        {isLoading ? <TwoSeventyRing color="white" /> : <ShoppingCart />}
        Cart ({cartItemsCount})
      </Button>
    </Link>
  );
}
