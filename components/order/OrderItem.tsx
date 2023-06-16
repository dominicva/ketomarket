import Image from 'next/image';
import { capitalize } from '@/lib/strings';
import type { CartItemWithProduct } from '@/types';

export function OrderItem({ item }: { item: CartItemWithProduct }) {
  return (
    <div className="mt-2 flex items-center justify-between border-b-2 pb-2">
      <div className="flex items-center">
        <Image
          src={String(item.product.image)}
          alt={item.product.name}
          className="h-14 w-14 rounded-md object-cover"
          width={48}
          height={48}
        />
        <div className="ml-2 sm:ml-4">
          <h4 className="text-lg font-medium">
            {capitalize(item.product.name)}
          </h4>
        </div>
      </div>
      <div className="flex basis-[35%] items-center gap-6 pr-4">
        <div className="flex flex-col">
          <h5 className="border-b-2 pb-1 font-medium">Quantity</h5>
          <p className="mr-4 mt-1 text-lg">{item.quantity}</p>
        </div>
        <div className="flex flex-col">
          <h5 className="border-b-2 pb-1 font-medium">Total</h5>
          <p className="mt-1 text-lg font-medium">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
