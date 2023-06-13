import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
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

export async function PUT(req: NextRequest, res: NextResponse) {
  const { name } = await req.json();
  const user = await getUserFromDb();

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'content-type': 'text/plain',
      },
    });
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name: name },
  });

  return new Response(JSON.stringify(updatedUser), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}
