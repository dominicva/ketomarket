'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Button } from '@/components/buttons';
import { updateCartItemQty } from '@/lib/api';
import { useNavigationLoading } from '@/lib/hooks/useNavigationLoading';
import { CheckCircle } from 'react-feather';

export default function AddToCart({
  cartItemId,
  cartItemQty,
  productId,
}: {
  cartItemId: string | undefined;
  cartItemQty: number | undefined;
  productId: string | undefined;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [quantity, setQuantity] = useState(cartItemQty ?? 1);
  const { isLoading, handleStartLoading, handleStopLoading } =
    useNavigationLoading();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const quantity = Number(data.quantity);

    try {
      if (cartItemId) {
        await updateCartItemQty(cartItemId, quantity);
      } else if (productId) {
        await fetch('/api/cart', {
          method: 'POST',
          body: JSON.stringify({ productId, quantity }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      setSuccess(true);
      router.refresh();
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }

    setLoading(false);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <fieldset>
          <legend className="sr-only">Quantity</legend>
          <div className="flex items-center justify-between">
            <label htmlFor="quantity" className="sr-only">
              Quantity
            </label>
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="outline-none-grey-200 block h-12 w-full cursor-pointer rounded border-2  border-gray-300 text-center text-xl text-secondary focus:border-tertiary focus-visible:border-tertiary active:border-tertiary"
            >
              {Array.from(Array(10).keys()).map(i => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </div>
        </fieldset>

        {/* <Button
          intent="primary"
          size="large"
          className="flex w-full justify-center"
          // @ts-expect-error
          disabled={loading}
        > */}
        {loading ? (
          <Button
            intent="primary"
            size="large"
            className="flex w-full justify-center"
            // @ts-expect-error
            disabled={loading}
          >
            <TwoSeventyRing color="white" />
          </Button>
        ) : success ? (
          <Button
            size="large"
            onClick={() => router.push('/profile/cart')}
            className="flex w-full items-center justify-center gap-2"
          >
            <CheckCircle size={20} />
            <span>Go to Cart</span>
          </Button>
        ) : (
          <Button
            size="large"
            className="flex w-full items-center justify-center"
          >
            Update Cart ({quantity})
          </Button>
        )}
      </form>
      {/* <Link
        href="/profile/cart"
        passHref
        onClick={handleStartLoading}
        onLoad={handleStopLoading}
        className="block"
      >
        <Button
          size="large"
          intent="tertiary"
          className="flex h-14 w-full justify-center"
        >
          {isLoading ? (
            <TwoSeventyRing color="#09624B" />
          ) : (
            <span>View Cart</span>
          )}
        </Button>
      </Link> */}
    </>
  );
}
