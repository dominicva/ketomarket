'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart } from 'react-feather';
import { TwoSeventyRing } from 'react-svg-spinners';
import { useNavigationLoading } from '@/lib/hooks/useNavigationLoading';
import { Button } from '@/components/buttons';

export function GoToCart({ cartItemsCount }: { cartItemsCount: number }) {
  const { isLoading, handleStartLoading, handleStopLoading } =
    useNavigationLoading();

  return (
    <Link
      href="/profile/cart"
      passHref
      onClick={handleStartLoading}
      onLoad={handleStopLoading}
    >
      <Button intent="secondary" className="mt-6 flex gap-2">
        {isLoading ? <TwoSeventyRing color="white" /> : <ShoppingCart />}
        Cart ({cartItemsCount})
      </Button>
    </Link>
  );
}
