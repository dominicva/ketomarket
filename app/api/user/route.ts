import { getUserFromDb } from '@/lib/user';

export async function GET() {
  const user = await getUserFromDb();
  return new Response(
    JSON.stringify({
      user,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}
