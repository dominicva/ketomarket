import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getProducts } from '@/lib/product';

export const GET = async () => {
  try {
    const products = await getProducts();

    return new Response(JSON.stringify(products), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const body = await req.json();
  const { description, image, category } = body;
  const name = body.name.toLowerCase();
  const price = Number(body.price);

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        category: {
          connect: {
            name: category,
          },
        },
      },
    });

    return new Response(JSON.stringify(product), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
};

export const PUT = async (req: NextRequest, _res: NextResponse) => {
  const body = await req.json();
  const { id, description, image, category } = body;
  const name = body.name.toLowerCase();
  const price = Number(body.price);

  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        image,
        category: {
          connect: {
            name: category,
          },
        },
      },
    });

    return new Response(JSON.stringify(product), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest, _res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') ?? '';

  try {
    const deletedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return new Response(JSON.stringify({ deletedProduct }), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
};
