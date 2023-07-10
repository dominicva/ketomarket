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

export const PUT = async (request: NextRequest) => {
  const { category, updated } = await request.json();

  const headers = {
    'content-type': 'application/json',
  };

  if (!category) {
    return new Response(JSON.stringify({ error: 'No category provided' }), {
      status: 400,
      headers,
    });
  }

  if (!updated) {
    return new Response(
      JSON.stringify({ error: 'No updated category name provided' }),
      {
        status: 400,
        headers,
      }
    );
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: {
        name: category,
      },
      data: {
        name: updated,
      },
    });

    return new Response(JSON.stringify({ updatedCategory }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers,
    });
  }
};
