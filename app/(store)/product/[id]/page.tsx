import { CartItem } from '@prisma/client';
import { getProductById } from '@/lib/product';
import { getCartItemId } from '@/lib/cart';
import { prisma } from '@/lib/db';
import ProductPage from '@/components/product/ProductPage';
import { getUser } from '@/lib/user';

export default async function Product({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await getUser();
  const isLoggedIn = Boolean(user);
  const product = await getProductById(params.id);
  const cartItemId = await getCartItemId(String(product?.id));
  const cartItem =
    cartItemId &&
    ((await prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    })) as CartItem);

  return (
    <main className="p-6">
      <ProductPage
        product={product}
        cartItemId={cartItemId}
        // @ts-expect-error
        cartItem={cartItem}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}
