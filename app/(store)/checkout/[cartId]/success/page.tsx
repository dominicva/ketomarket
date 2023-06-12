import Link from 'next/link';
import { CheckCircle } from 'react-feather';
import { prisma } from '@/lib/db';
import { getCartData } from '@/lib/cart';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import { redirect } from 'next/navigation';

export default async function Success({
  params,
}: {
  params: { cartId: string };
}) {
  const {
    data: { cart },
  } = await getCartData();

  if (cart?.id !== params.cartId) {
    redirect('/checkout');
  }

  const newOrder = await prisma.order.create({
    data: {
      userId: cart.userId,
      orderItems: {
        create: cart.cartItems.map(item => ({
          quantity: item.quantity,
          productId: item.productId,
          price: item.product.price,
        })),
      },
    },
  });

  // await prisma.order.delete({
  //   where: {
  //     id: newOrder.id,
  //   },
  // });

  console.log('newOrder', newOrder);

  const deletedCartItems = await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  const deletedCart = await prisma.cart.delete({
    where: {
      id: cart.id,
    },
  });

  console.log('deletedCart', deletedCart);

  return (
    <div className="p-4">
      <Card className="mt-8 shadow-lg">
        <h2 className="mt-12 text-center text-2xl font-semibold">Success!</h2>
        <p className="mt-2 text-center text-lg">Your order has been placed.</p>
        <div className="mt-8 flex items-center justify-center">
          <CheckCircle className="h-32 w-32 text-green-500" size="xl" />
        </div>
      </Card>
      <Link href="/home">
        <Button size="large" className="m-auto mt-8 block w-11/12">
          Back to store
        </Button>
      </Link>
    </div>
  );
}
