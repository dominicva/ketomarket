import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { Cart } from '@prisma/client';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import Card from '@/components/Card';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/buttons';
import type {
  ServerSession,
  CartWithItemsAndProducts,
  CartItemWithProduct,
} from '@/types';

const getCurrentCart = async (
  userId: string | undefined
): Promise<CartWithItemsAndProducts | null> => {
  try {
    const carts = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return carts[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function Cart() {
  const session: ServerSession = await getServerSession(authOptions);
  const currentCart = await getCurrentCart(session?.user.id);
  const emptyCart = !currentCart?.cartItems.length;

  return (
    <section>
      <Card className="mt-4 bg-white">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <ul>
          {currentCart?.cartItems.length ? (
            currentCart.cartItems.map((cartItem: CartItemWithProduct) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))
          ) : (
            <p className="mt-6 text-lg">No items in cart 😞</p>
          )}
        </ul>
      </Card>
      <div className="mt-12 flex flex-col gap-6">
        <Link href="/home" className="flex items-center justify-center">
          <Button intent="tertiary" size="large" className="w-11/12">
            Continue shopping
          </Button>
        </Link>
        <Link href="/checkout" className="flex items-center justify-center">
          <Button
            intent={emptyCart ? 'disabled' : 'primary'}
            size="large"
            className="w-11/12 disabled:cursor-not-allowed disabled:bg-gray-300"
            // @ts-expect-error disabled prop is not in ButtonProps
            disabled={emptyCart}
          >
            Checkout
          </Button>
        </Link>
      </div>
    </section>
  );
}
