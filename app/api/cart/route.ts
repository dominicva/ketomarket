import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(req: NextRequest) {
  try {
    const { cartItemId, quantity } = await req.json();

    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json({
      data: cartItem,
    });
  } catch {
    return NextResponse.error();
  }
}
