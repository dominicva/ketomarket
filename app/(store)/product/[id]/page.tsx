import Image from 'next/image';
import { getProductById } from '@/lib/product';
import { getCartItemId } from '@/lib/cart';
import { prisma } from '@/lib/db';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import AddToCart from '@/components/product/AddToCart';
import { Button } from '@/components/buttons';
import Link from 'next/link';

export default async function Product({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const product = await getProductById(params.id);
  const cartItemId = await getCartItemId(String(product?.id));
  const cartItem =
    cartItemId &&
    (await prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    }));

  return (
    <main className="p-6">
      <Card
        as="article"
        className="m-auto flex max-w-5xl flex-col flex-wrap gap-4 transition duration-200 ease-in-out hover:translate-y-1 hover:shadow-lg sm:pb-4"
      >
        <Image
          src={product?.image ?? '/'}
          alt={product?.name ?? 'product image'}
          width={300}
          height={300}
          className="rounded-md rounded-b-none"
        />
        <section className="flex flex-col">
          <h3 className="text-xl">{capitalize(String(product?.name))}</h3>
          <h5 className="text-sm font-bold text-secondary">
            {capitalize(String(product?.category.name))}
          </h5>
          <p>{product?.description}</p>
        </section>
      </Card>
      <Card className="m-auto flex max-w-5xl flex-col gap-6">
        <hgroup>
          <h3 className="text-xl font-semibold text-secondary">
            ${product?.price}
          </h3>
          <p className="font-semibold text-tertiary">Free Delivery</p>
        </hgroup>
        <AddToCart
          cartItemId={cartItemId}
          cartItemQty={cartItem ? cartItem.quantity : undefined}
          productId={product?.id}
        />
      </Card>
    </main>
  );
}
