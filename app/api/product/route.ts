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
