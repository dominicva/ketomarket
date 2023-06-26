import { getCartData } from '@/lib/cart';
import { OrderCta, OrderReview, OrderSummary } from '@/components/order';

export default async function Checkout() {
  const {
    data: { cart, cartTotal },
  } = await getCartData();

  return (
    <div className="m-auto max-w-5xl p-4 pt-0">
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
