import type { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/user';

export async function POST(req: NextRequest, res: NextResponse) {
  const { image } = await req.json();
  const user = await getUser();

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'content-type': 'text/plain',
      },
    });
  } else {
    const updatedUser = await prisma.user.update({
      // @ts-ignore
      where: { id: user.id },
      data: { image: image },
    });

    console.log('updatedUser', updatedUser);

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
