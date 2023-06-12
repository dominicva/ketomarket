import Card from '@/components/Card';
import { OrderItem } from './OrderItem';
import type { OrderWithOrderItems } from '@/types/OrderWithOrderItems';

export function Order({ order }: { order: OrderWithOrderItems }) {
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
