import Image from 'next/image';
import { getProductById } from '@/lib/product';
import { getCartItemId } from '@/lib/cart';
import { prisma } from '@/lib/db';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import AddToCart from '@/components/product/AddToCart';
import ProductPageSkeleton from '@/components/skeletons/ProductPageSkeleton';

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
            className="w-full rounded-md rounded-b-none sm:basis-[40%]"
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
          <AddToCart
            cartItemId={cartItemId}
            cartItemQty={cartItem ? cartItem.quantity : undefined}
            productId={product?.id}
          />
        </Card>
      </div>
    </main>
  );
}
