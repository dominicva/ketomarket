'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Trash } from 'react-feather';
import { updateCartItemQty } from '@/lib/api';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';

// function Spinner() {
//   return (
//     <div className="flex h-6 w-14  items-center justify-center rounded bg-accent p-2">
//       <TwoSeventyRing color="white" width={20} height={20} />
//     </div>
//   );
// }

export default function CartItem({ cartItem }: { cartItem: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const total = cartItem.product.price * quantity;

  const handleDelete = async () => {
    await fetch(`/api/cart?cartItemId=${cartItem.id}`, {
      method: 'DELETE',
    });

    router.refresh();
  };

  const handleSelectChange = async (e: FormEvent<HTMLSelectElement>) => {
    const newQuantity = Number(e.currentTarget.value);
    setLoading(true);
    setQuantity(newQuantity);
    await submitForm(e, newQuantity);
    setLoading(false);
  };

  const submitForm = async (
    e: FormEvent<HTMLSelectElement>,
    newQuantity: number
  ) => {
    e.preventDefault();
    await updateCartItemQty(cartItem.id, newQuantity);
  };

  return (
    <Card className="mt-4 bg-secondary-lighter">
      <h3 className="text-lg font-semibold">
        {capitalize(cartItem.product.name)}
      </h3>
      <li key={cartItem.id} className="my-6 flex gap-6">
        <hgroup>
          <h4 className="mb-2">Price</h4>
          <p>${cartItem.product.price}</p>
        </hgroup>

        <hgroup>
          <h4 className="mb-2">Total</h4>
          {loading ? (
            <div className="flex h-6 w-14  items-center justify-center rounded bg-accent p-2">
              <TwoSeventyRing color="white" width={20} height={20} />
            </div>
          ) : (
            <p>${total.toFixed(2)}</p>
          )}
        </hgroup>

        <div className="ml-auto flex flex-col gap-2">
          <form className="ml-auto flex flex-col gap-2">
            <label htmlFor="quantity">Quantity</label>
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleSelectChange}
            >
              {Array.from(Array(10).keys()).map(i => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </form>
          <Button
            intent="secondary"
            size="small"
            className="flex justify-center"
            onClick={handleDelete}
          >
            <Trash size={20} />
          </Button>
        </div>
      </li>
    </Card>
  );
}
