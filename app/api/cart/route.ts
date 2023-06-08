import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getCurrentCart, getCartTotal } from '@/lib/cart';
import type { ServerSession } from '@/types';

export const GET = async (req: NextRequest) => {
  const searchParams = new URL(req.url).searchParams;
  const userId = searchParams.get('userId');
  const cart = await getCurrentCart(String(userId));
  const cartTotal = cart ? getCartTotal(cart) : 0;

  const res = {
    data: {
      cart,
      cartTotal,
    },
  };

  console.log('res', res);

  return NextResponse.json({
    data: {
      cart,
      cartTotal,
    },
  });
};

export const POST = async (req: NextRequest) => {
  try {
    const { productId } = await req.json();
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
            quantity: existingCartItem.quantity + 1,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: existingCart.id,
            productId,
            quantity: 1,
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
              quantity: 1,
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

    return NextResponse.json({
      data: cartItem,
    });
  } catch {
    return NextResponse.json(
      { error: 'There was an error updating the item in your cart.' },
      { status: 500 }
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
