import Card from '@/components/Card';
import { OrderItem } from './OrderItem';
import { OrderSummary } from './OrderSummary';
import { getOrderTotal } from '@/lib/order';
import type { OrderWithOrderItems } from '@/types/OrderWithOrderItems';

export function Order({ order }: { order: OrderWithOrderItems }) {
  const orderTotal = getOrderTotal(order);

  return (
    <Card className="mt-4 bg-secondary-lighter px-4 sm:px-6">
      <h2 className="mb-6 text-lg font-semibold">
        Order Number <span className="block">#{order.id}</span>
      </h2>
      <OrderSummary cartTotal={orderTotal} />
      <ul>
        {order.orderItems.map((item: any) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </ul>
    </Card>
  );
}
