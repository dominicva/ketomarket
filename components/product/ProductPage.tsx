import Image from 'next/image';
import Link from 'next/link';
import { capitalize } from '@/lib/strings';
import Card from '../Card';
import AddToCart from './AddToCart';
import { CartItem } from '@prisma/client';
import type { ProductWithCategory } from '@/types';
import { Button } from '../buttons';

export default function ProductPage({
  product,
  cartItemId,
  cartItem,
  isLoggedIn,
}: {
  product: ProductWithCategory;
  cartItemId: string | undefined;
  cartItem: CartItem;
  isLoggedIn: boolean;
}) {
  return (
    <div className="flex flex-col items-center ">
      <Card
        as="article"
        className="m-auto flex max-w-2xl flex-col flex-wrap gap-8 sm:flex-row sm:pb-4 lg:ml-auto"
      >
        <Image
          src={product?.image ?? '/'}
          alt={product?.name ?? 'product image'}
          width={300}
          height={300}
          className="w-full rounded-md rounded-b-none sm:basis-[50%]"
        />
        <section className="flex flex-col sm:basis-[40%]">
          <h3 className="text-xl">{capitalize(String(product?.name))}</h3>
          <h5 className="text-sm font-bold text-secondary">
            {capitalize(String(product?.category.name))}
          </h5>
          <p>{product?.description}</p>
        </section>
      </Card>
      <Card className="m-auto flex w-full max-w-md flex-col gap-4 sm:w-1/2">
        <hgroup>
          <h3 className="text-xl font-semibold text-secondary">
            ${product?.price}
          </h3>
          <p className="font-semibold text-tertiary">Free Delivery</p>
        </hgroup>
        {isLoggedIn ? (
          <AddToCart
            cartItemId={cartItemId}
            cartItemQty={cartItem ? cartItem.quantity : undefined}
            productId={product?.id}
          />
        ) : (
          <Link href="/signin" className="block">
            <span className="block text-center text-lg font-semibold">
              Log in to add this item to your cart
            </span>
            <Button
              size="large"
              intent="secondary"
              className="m-auto mt-4 block w-11/12"
            >
              Go to Login
            </Button>
          </Link>
        )}
      </Card>
    </div>
  );
}
