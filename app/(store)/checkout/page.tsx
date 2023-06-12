import { getCartData } from '@/lib/cart';
import { OrderCta, OrderReview, OrderSummary } from '@/components/order';
import Card from '@/components/Card';

export default async function Checkout() {
  const {
    data: { cart, cartTotal },
  } = await getCartData();

  return (
    <div className="p-4">
      {cart?.cartItems.length ? (
        <OrderReview cart={cart} />
      ) : (
        <p className="mt-6 text-lg">No items in cart 😞</p>
      )}
      <OrderSummary cartTotal={cartTotal} />
      <OrderCta cart={cart} />
    </div>
  );
}
