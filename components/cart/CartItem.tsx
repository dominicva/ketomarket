'use client';

import { FormEvent, useState } from 'react';
import { updateCartItemQty } from '@/lib/api';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import Button from '@/components/buttons/Button';

export default function CartItem({ cartItem }: { cartItem: any }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const total = (cartItem.product.price * quantity).toFixed(2);

  const updateCartItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const elements = form.elements as HTMLFormControlsCollection;
    const selectElement = elements[0] as HTMLSelectElement;
    const newQuantity = Number(selectElement.value);
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
          <p>${total}</p>
        </hgroup>

        <form className="ml-auto flex flex-col gap-2" onSubmit={updateCartItem}>
          <label htmlFor="quantity">Quantity</label>
          <select
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            onBlur={e => setQuantity(Number(e.target.value))}
          >
            {Array.from(Array(10).keys()).map(i => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
          <Button intent="secondary" size="small" className="mt-4">
            Update
          </Button>
        </form>
      </li>
    </Card>
  );
}
