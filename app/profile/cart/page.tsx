import { getServerSession } from 'next-auth';
import { Cart } from '@prisma/client';
import { getCurrentCart, getCartTotal } from '@/lib/cart';
import { authOptions } from '@/lib/auth';
import Card from '@/components/Card';
import CartItem from '@/components/cart/CartItem';
import CartCta from '@/components/cart/CartCta';
import type { ServerSession, CartItemWithProduct } from '@/types';

export default async function Cart() {
  const session: ServerSession = await getServerSession(authOptions);
  const userId = session?.user.id;
  const currentCart = await getCurrentCart(userId);
  const emptyCart = !currentCart?.cartItems.length;
  const cartTotal = currentCart ? getCartTotal(currentCart) : 0;

  return (
    <section>
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
      <Card className="mt-4 bg-white">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="mt-6 flex justify-between">
          <p className="text-lg">Subtotal</p>
          <p className="text-lg">${cartTotal.toFixed(2)}</p>
        </div>
      </Card>
      <CartCta emptyCart={emptyCart} />
    </section>
  );
}
