import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const { password } = await req.json();
  const adminSecret = process.env.ADMIN_SECRET;

  const headers = {
    'content-type': 'application/json',
  };

  if (!adminSecret) {
    return new Response('Admin secret not set', { status: 500, headers });
  }

  if (password !== adminSecret) {
    return new Response(JSON.stringify({ authorized: false }), {
      status: 401,
      headers,
    });
  }

  return new Response(JSON.stringify({ authorized: true }), {
    status: 200,
    headers,
  });
};
