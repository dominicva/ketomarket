import Card from '@/components/Card';
import { prisma } from '@/lib/db';
import { OrderItem } from '@/components/order';

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

  console.log('orders', orders);

  return (
    <section className="py-4">
      <h2 className="text-2xl font-semibold">Orders</h2>
      {orders.map((order: any) => (
        <Order key={order.id} order={order} />
      ))}
    </section>
  );
}

function Order({ order }: { order: any }) {
  return (
    <Card className="my-6 bg-secondary-lighter">
      <h2 className="mb-8 text-lg font-semibold">
        Order Number <span className="block">#{order.id}</span>
      </h2>
      <ul>
        {order.orderItems.map((item: any) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </ul>
    </Card>
  );
}
