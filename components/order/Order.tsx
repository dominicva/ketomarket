import Card from '@/components/Card';
import { OrderItem } from './OrderItem';
import type { OrderWithOrderItems } from '@/types/OrderWithOrderItems';
import { OrderSummary } from './OrderSummary';
import { getOrderTotal } from '@/lib/order';

export function Order({ order }: { order: OrderWithOrderItems }) {
  const orderTotal = getOrderTotal(order);

  return (
    <Card className="mt-4 bg-secondary-lighter">
      <OrderSummary cartTotal={orderTotal} />
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
