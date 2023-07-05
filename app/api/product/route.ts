import { prisma } from '@/lib/db';
import { getProducts } from '@/lib/product';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

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

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { name, description, price, image, category } = await req.json();
  console.log('name', name);
  console.log('description', description);
  console.log('price', price);
  console.log('image', image);
  console.log('category', category);

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
