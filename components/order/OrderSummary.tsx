import Card from '@/components/Card';

export function OrderSummary({ cartTotal }: { cartTotal: number }) {
  return (
    <Card className="mt-4 bg-white">
      <h2 className="text-2xl font-semibold">Order Summary</h2>
      <div className="mt-6 flex justify-between">
        <p className="text-lg">Subtotal</p>
        <p className="text-lg">${cartTotal.toFixed(2)}</p>
      </div>
      <div className="mt-6 flex justify-between border-b-4 border-primary pb-6">
        <p className="text-lg">Shipping</p>
        <p className="text-lg">Free</p>
      </div>
      <div className="mt-4 flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <p className="text-lg font-bold">${cartTotal.toFixed(2)}</p>
      </div>
    </Card>
  );
}
