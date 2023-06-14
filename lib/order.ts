import { prisma } from './db';
import { Order } from '@prisma/client';

export const getOrders = async (userId: string | undefined) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteOrderItems = async (orderId: string | undefined) => {
  try {
    const deletedOrderItems = await prisma.orderItem.deleteMany({
      where: { orderId },
    });

    return deletedOrderItems;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteOrders = async (orders: Order[]) => {
  try {
    const deletedOrders = await prisma.order.deleteMany({
      where: {
        id: {
          in: orders.map(order => order.id),
        },
      },
    });

    return deletedOrders;
  } catch (error) {
    console.error(error);
    return null;
  }
};
