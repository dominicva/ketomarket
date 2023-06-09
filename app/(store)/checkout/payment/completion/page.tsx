import { CheckCircle } from 'react-feather';
import { getCartData } from '@/lib/cart';
import Card from '@/components/Card';
import { OrderReview } from '@/components/order';

export default async function Payment() {
  const {
    data: { cart, cartTotal },
  } = await getCartData();

  return (
    <div className="p-4">
      <Card className="mt-8 shadow-lg">
        <h2 className="mt-12 text-center text-2xl font-semibold">Success!</h2>
        <p className="mt-2 text-center text-lg">Your order has been placed.</p>
        <div className="mt-8 flex items-center justify-center">
          <CheckCircle className="h-32 w-32 text-green-500" size="xl" />
        </div>
      </Card>
      {cart ? (
        <OrderReview cart={cart} />
      ) : (
        <div className="mt-8 text-center text-lg">
          <p>Order details are currently unavailable.</p>
          <p>Please check your email for your receipt.</p>
        </div>
      )}
    </div>
  );
}
