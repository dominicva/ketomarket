import { getCartData } from '@/lib/cart';

export default async function Payment() {
  const {
    data: { cart, cartTotal },
  } = await getCartData();
  return (
    <div>
      <h1>Payment</h1>
    </div>
  );
}
