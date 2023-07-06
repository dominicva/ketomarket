import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { password } = await req.json();
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    return new Response('Admin secret not set', { status: 500 });
  }

  if (password !== adminSecret) {
    return new Response(JSON.stringify({ authorized: false }), { status: 401 });
  }

  return new Response(JSON.stringify({ authorized: true }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
};
