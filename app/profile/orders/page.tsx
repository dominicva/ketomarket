import { prisma } from '@/lib/db';
import { Order } from '@/components/order';
import Card from '@/components/Card';

export default async function Orders() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <section className="py-4">
      <h2 className="text-2xl font-semibold">Orders</h2>
      {orders.length === 0 ? (
        orders.map((order: any) => <Order key={order.id} order={order} />)
      ) : (
        <Card className="mt-6">
          <p className="text-lg">No orders yet 😞</p>
        </Card>
      )}
    </section>
  );
}
