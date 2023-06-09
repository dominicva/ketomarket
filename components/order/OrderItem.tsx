import Image from 'next/image';
import { capitalize } from '@/lib/strings';
import type { CartItemWithProduct } from '@/types';

export function OrderItem({ item }: { item: CartItemWithProduct }) {
  return (
    <>
      <div className="flex items-center">
        <Image
          src={String(item.product.image)}
          alt={item.product.name}
          className="h-16 w-16 rounded-md object-cover"
          width={64}
          height={64}
        />
        <div className="ml-4">
          <h4 className="text-lg font-semibold">
            {capitalize(item.product.name)}
          </h4>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <h5 className="border-b-2 pb-1 font-semibold">Quantity</h5>
          <p className="mr-4 mt-2 text-lg">{item.quantity}</p>
        </div>
        <div className="flex flex-col">
          <h5 className="border-b-2 pb-1 font-semibold">Total</h5>
          <p className="mt-2 text-lg font-semibold">
            ${item.product.price * item.quantity}
          </p>
        </div>
      </div>
    </>
  );
}
