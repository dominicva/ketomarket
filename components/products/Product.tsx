import { Plus } from 'react-feather';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { capitalize } from '@/lib/strings';
import Card from '@/components/Card';
import { Button } from '@/components/buttons';
import type { ProductProps, ServerSession } from '@/types';

export default async function Product({
  id,
  name,
  description,
  price,
  category,
}: ProductProps) {
  const session: ServerSession = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const addToCart = async () => {
    'use server';

    const existingCart = await prisma.cart.findFirst({
      where: {
        userId: session?.user.id,
      },
    });

    console.log('existingCart', existingCart ?? 'no cart');

    if (existingCart) {
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: existingCart?.id,
          productId: id,
        },
      });
      console.log('existingCartItem', existingCartItem);

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
            productId: id,
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
              productId: id,
              quantity: 1,
            },
          },
        },
      });
      console.log('newCart', newCart);
    }

    // if (existingCartItem) {
    //   await prisma.cartItem.update({
    //     where: {
    //       id: existingCartItem.id,
    //     },
    //     data: {
    //       quantity: existingCartItem.quantity + 1,
    //     },
    //   });
    // }

    // if (!existingCartItem && existingCart) {
    //   const newCartItem = await prisma.cartItem.create({
    //     data: {
    //       cartId: existingCart.id,
    //       productId: id,
    //       quantity: 1,
    //     },
    //   });

    // console.log('newCartItem', newCartItem);
    // }
  };

  return (
    <Card className="relative bg-off-white">
      <h3 className="text-xl">{capitalize(name)}</h3>
      <h5 className="text-sm font-bold text-secondary">
        {capitalize(category.name)}
      </h5>
      <h4 className="mb-2 font-semibold">${price}</h4>
      <p>{description}</p>
      <form action={addToCart}>
        <Button
          intent="tertiary"
          size="small"
          className="absolute right-4 top-4 mt-4 flex gap-2"
        >
          <Plus />
          Add to cart
        </Button>
      </form>
    </Card>
  );
}
