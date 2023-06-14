import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromDb } from '@/lib/user';
import { deleteCarts } from '@/lib/cart';
import { getOrders } from '@/lib/order';

export async function GET() {
  const user = await getUserFromDb();
  return new Response(
    JSON.stringify({
      user,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { name } = await req.json();
  const user = await getUserFromDb();

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'content-type': 'text/plain',
      },
    });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name: name },
  });

  return new Response(JSON.stringify(updatedUser), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function DELETE() {
  const user = await getUserFromDb();

  const deletedCarts = await deleteCarts(user?.id);

  const orders = (await getOrders(user?.id)) ?? [];

  for (const order of orders) {
    await prisma.orderItem.deleteMany({
      where: { orderId: order.id },
    });
  }

  const deletedOrders = await prisma.order.deleteMany({
    where: { userId: user?.id },
  });

  const deletedUser = await prisma.user.delete({
    where: { id: user?.id },
  });

  console.log({
    deletedCarts,
    deletedOrders,
    deletedUser,
  });

  return new Response(
    JSON.stringify({ deletedCarts, deletedOrders, deletedUser }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  // return new Response(JSON.stringify('Not implemented'), {
  //   status: 200,
  //   headers: {
  //     'content-type': 'application/json',
  //   },
  // });
}
