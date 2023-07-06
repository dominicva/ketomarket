import { getCategories } from '@/lib/category';

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
