import { Order } from '@/components/order';
import { getOrders } from '@/lib/order';
import { getUser } from '@/lib/user';
import Card from '@/components/Card';

export default async function Orders() {
  const user = await getUser();
  // @ts-expect-error
  const orders = (await getOrders(user?.id)) ?? [];

  return (
    <section className="max-w-xl py-4">
      <h2 className="text-2xl font-semibold">Orders ({orders.length})</h2>
      {orders.length ? (
        orders.map((order: any) => <Order key={order.id} order={order} />)
      ) : (
        <Card className="mt-6">
          <p className="text-lg">No orders yet 😞</p>
        </Card>
      )}
    </section>
  );
}
