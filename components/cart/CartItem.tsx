'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Trash } from 'react-feather';
import { updateCartItemQty } from '@/lib/api';
import { capitalize } from '@/lib/strings';
import { Button } from '@/components/buttons';
import type { CartItemWithProduct } from '@/types';

export function CartItem({ cartItem }: { cartItem: CartItemWithProduct }) {
  const router = useRouter();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const total = cartItem.product.price * quantity;

  const handleDelete = async () => {
    setLoadingDelete(true);
    await fetch(`/api/cart?cartItemId=${cartItem.id}`, {
      method: 'DELETE',
    });

    router.refresh();
    setLoadingDelete(false);
  };

  const handleSelectChange = async (e: FormEvent<HTMLSelectElement>) => {
    const newQuantity = Number(e.currentTarget.value);
    setLoadingUpdate(true);
    setQuantity(newQuantity);
    await submitForm(e, newQuantity);
    router.refresh();
    setLoadingUpdate(false);
  };

  const submitForm = async (
    e: FormEvent<HTMLSelectElement>,
    newQuantity: number
  ) => {
    e.preventDefault();
    await updateCartItemQty(cartItem.id, newQuantity);
  };

  return (
    <li className="my-6">
      <div className="flex flex-wrap justify-between">
        <div className="flex gap-4">
          <Image
            src={cartItem.product.image ?? '/images/placeholder.png'}
            alt={cartItem.product.name}
            width={80}
            height={80}
            className="rounded"
          />
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              {capitalize(cartItem.product.name)}
            </h3>
            <Button
              intent="text"
              size="small"
              onClick={handleDelete}
              className="-ml-1 flex items-center justify-center gap-2 text-sm"
            >
              {loadingDelete ? (
                <TwoSeventyRing color="#0d0a0b" width={20} height={20} />
              ) : (
                <Trash size={18} />
              )}
              Remove
            </Button>
          </div>
        </div>
        <div className="flex basis-[39%] items-start gap-4">
          <div className="flex items-center gap-4">
            <form>
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleSelectChange}
                  className="block h-8 w-16 cursor-pointer rounded border-2 border-gray-300 text-secondary"
                >
                  {Array.from(Array(10).keys()).map(i => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </form>
            {loadingUpdate ? (
              <div className="flex h-8 w-14 items-center justify-center rounded bg-accent p-2">
                <TwoSeventyRing color="white" width={20} height={20} />
              </div>
            ) : (
              <p>${total.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
