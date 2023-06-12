import { Prisma } from '@prisma/client';

const orderWithOrderItems = Prisma.validator<Prisma.OrderArgs>()({
  include: {
    orderItems: true,
  },
});

export type OrderWithOrderItems = Prisma.OrderGetPayload<
  typeof orderWithOrderItems
>;
