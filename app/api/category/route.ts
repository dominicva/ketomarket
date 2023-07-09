import { getCategories } from '@/lib/category';
import { prisma } from '@/lib/db';
import { NextRequest } from 'next/server';

export const GET = async () => {
  const categories = await getCategories();

  if (!categories) {
    return new Response(JSON.stringify({ error: 'No categories found' }), {
      status: 404,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify({ categories }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { name, description } = body;

  if (!name) {
    return new Response(JSON.stringify({ error: 'No name provided' }), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  if (!description) {
    return new Response(JSON.stringify({ error: 'No description provided' }), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return new Response(JSON.stringify({ category }), {
      status: 201,
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
};
