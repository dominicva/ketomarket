'use client';

import Card from '@/components/Card';
import { capitalize } from '@/lib/strings';

export default function CartItem({ cartItem }: { cartItem: any }) {
  return (
    <Card className="mt-4 bg-secondary-lighter">
      <h3>{capitalize(cartItem.product.name)}</h3>
      <li key={cartItem.id} className="my-6 flex gap-6">
        <hgroup>
          <h4 className="mb-2">Price</h4>
          <p>${cartItem.product.price}</p>
        </hgroup>
        <hgroup>
          <h4 className="mb-2">Quantity</h4>
          <select defaultValue={cartItem.quantity}>
            {Array.from(Array(10).keys()).map(i => (
              <option key={i}>{i + 1}</option>
            ))}
          </select>
        </hgroup>
        <hgroup className="ml-auto">
          <h4 className="mb-2">Total</h4>
          <p>${cartItem.product.price * cartItem.quantity}</p>
        </hgroup>
      </li>
    </Card>
  );
}
