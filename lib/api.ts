import type { CartItemWithProduct } from '@/types';

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: string;
  body: any;
  json?: boolean;
}) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('API error');
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const updateCartItemQty = async (
  cartItemId: CartItemWithProduct['id'],
  quantity: number
) => {
  return fetch('/api/cart', {
    method: 'PUT',
    body: JSON.stringify({ cartItemId, quantity }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  // return fetcher({
  //   url: '/api/cart',
  //   method: 'PUT',
  //   body: { cartItemId, quantity },
  // });
};
