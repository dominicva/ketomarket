import Card from '@/components/Card';
import { OrderItem } from './OrderItem';
import type { CartWithItemsAndProducts } from '@/types';

export function OrderReview({ cart }: { cart: CartWithItemsAndProducts }) {
  return (
    <Card className="mt-4 bg-white">
      <h2 className="text-2xl font-semibold">Checkout</h2>
      <h3 className="mt-6 text-xl">Review your order</h3>
      <section className="mt-6">
        {cart.cartItems.map(item => (
          <div
            key={item.id}
            className="mt-4 flex items-center justify-between border-b-2 pb-4"
          >
            <OrderItem item={item} />
          </div>
        ))}
      </section>
    </Card>
  );
}
