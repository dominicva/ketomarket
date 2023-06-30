import { Cart } from '@prisma/client';
import { getCurrentCart, getCartTotal } from '@/lib/cart';
import Card from '@/components/Card';
import { CartCta, CartItemsList } from '@/components/cart';

export default async function Cart() {
  const currentCart = await getCurrentCart();
  const emptyCart = !currentCart?.cartItems.length;
  const cartTotal = currentCart ? getCartTotal(currentCart) : 0;

  return (
    <section className="max-w-xl py-4">
      <h2 className="text-2xl font-semibold">Cart</h2>
      <CartItemsList cart={currentCart} />
      <Card className="mt-4 max-w-xl bg-white">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="mt-6 flex justify-between">
          <p className="text-lg">Subtotal</p>
          <p className="mr-1 text-lg font-semibold">${cartTotal.toFixed(2)}</p>
        </div>
      </Card>
      <CartCta emptyCart={emptyCart} />
    </section>
  );
}
