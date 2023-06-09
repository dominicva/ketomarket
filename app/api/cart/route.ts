import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getCartData } from '@/lib/cart';
import type { ServerSession } from '@/types';

export const GET = async () => {
  const { data } = await getCartData();
  return NextResponse.json({ data });
};

export const POST = async (req: NextRequest) => {
  try {
    const { productId, quantity } = await req.json();
    const session: ServerSession = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in to add items to your cart.' },
        { status: 401 }
      );
    }

    const existingCart = await prisma.cart.findFirst({
      where: {
        userId,
      },
    });

    if (existingCart) {
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: existingCart?.id,
          productId,
        },
      });

      if (existingCartItem) {
        await prisma.cartItem.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity + quantity ? quantity : 1,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: existingCart.id,
            productId,
            quantity: quantity ? quantity : 1,
          },
        });
      }
    } else {
      const newCart = await prisma.cart.create({
        data: {
          userId: session?.user.id,
          cartItems: {
            create: {
              productId,
              quantity: quantity ? quantity : 1,
            },
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'There was an error adding the item to your cart.' },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { cartItemId, quantity } = await req.json();

    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    console.log('cartItem', cartItem ?? 'error');

    return new Response(JSON.stringify({ data: cartItem }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        error: 'There was an error updating the item in your cart.',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const cartItemId = req.nextUrl.searchParams.get('cartItemId') ?? '';

    const deletedCartItem = await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({
      data: deletedCartItem,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'There was an error removing the item from your cart.' },
      { status: 500 }
    );
  }
};
