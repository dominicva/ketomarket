'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Trash } from 'react-feather';
import { updateCartItemQty } from '@/lib/api';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
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
    <li className="mb-6">
      <Card className="mt-4 bg-secondary-lighter px-4 py-4">
        <h3 className="mb-2 text-lg font-semibold">
          {capitalize(cartItem.product.name)}
        </h3>
        <div className="grid grid-cols-3 gap-y-6">
          <Image
            src={cartItem.product.image ?? '/images/placeholder.png'}
            alt={cartItem.product.name}
            width={80}
            height={80}
            className="col-span-1 self-end rounded-md"
          />
          <hgroup className="col-span-1">
            <h4 className="mb-2">Price</h4>
            <p>${cartItem.product.price}</p>
          </hgroup>
          <form>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity">Quantity</label>
              <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleSelectChange}
                className="h-6 w-16 rounded"
              >
                {Array.from(Array(10).keys()).map(i => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
          </form>
          <hgroup className="col-span-1">
            <h4 className="mb-2 font-semibold">Total</h4>
            {loadingUpdate ? (
              <div className="flex h-6 w-14  items-center justify-center rounded bg-accent p-2">
                <TwoSeventyRing color="white" width={20} height={20} />
              </div>
            ) : (
              <p className="font-semibold">${total.toFixed(2)}</p>
            )}
          </hgroup>

          <Button
            intent="secondary"
            size="round"
            onClick={handleDelete}
            className="flex h-10 w-10 items-center justify-center self-center"
          >
            {loadingDelete ? (
              <TwoSeventyRing color="white" width={20} height={20} />
            ) : (
              <Trash size={20} />
            )}
          </Button>
        </div>
      </Card>
    </li>
  );
}
