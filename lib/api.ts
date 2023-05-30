export async function fetcher({
  url,
  method,
  body,
  json = true,
}: {
  url: string;
  method: string;
  body: any;
  json?: boolean;
}) {
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
}

export function register(user: any) {
  return fetcher({ url: 'api/register', method: 'post', body: user });
}

export function signin(user: any) {
  return fetcher({ url: 'api/signin', method: 'post', body: user });
}
