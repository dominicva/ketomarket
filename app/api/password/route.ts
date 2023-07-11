import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import { prisma } from '@/lib/db';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { searchParams } = new URL(req.url);
  const tokenParam = searchParams.get('jwt');
  const token = req.cookies.get('password-reset');
  console.log('tokenParam', tokenParam);
  console.log('token', token);

  if (!tokenParam || !token) {
    return new Response(
      JSON.stringify({
        error: 'Invalid token',
      }),
      {
        status: 400,
        headers: {
          accept: 'application/json',
        },
      }
    );
  }

  if (tokenParam !== token.value) {
    return new Response(
      JSON.stringify({
        error: 'Invalid token',
      }),
      {
        status: 400,
        headers: {
          accept: 'application/json',
        },
      }
    );
  }

  redirect(`/reset-password/${token}`);
};

export const POST = async (req: NextRequest, _res: NextResponse) => {
  const body = await req.json();
  const jwt = sign(body, process.env.PASSWORD_RESET_SECRET!, {
    expiresIn: '10h',
  });
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        error: 'User not found',
      }),
      {
        status: 404,
        headers: {
          accept: 'application/json',
        },
      }
    );
  }
  console.log('user', user);
  console.log('body', body);
  // console.log('jwt', jwt);

  const emailData = {
    to: body.email,
    from: process.env.EMAIL_FROM!,
    subject: `Password Reset link 🙏`,
    html: `
      <h1>Please use the following link to reset your password</h1>
      <a href="${process.env.CLIENT_URL}/reset-password/${jwt}">Reset password</a>
      <hr />
      <p>This email may contain sensitive information</p>
      <p>Your friends @ <a href="https://ketomarket.vercel.app">Ketomarket</a> 🚀</p>
    `,
  };

  await sgMail.send(emailData);

  return new Response(null, {
    status: 200,
    headers: {
      'Set-Cookie': `password-reset=${jwt}; Path=/; HttpOnly; Secure; SameSite=Strict`,
    },
  });
};

export const PUT = async (req: NextRequest, _res: NextResponse) => {
  const { email, password } = await req.json();
  // console.log('body', body);
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        error: 'User not found',
      }),
      {
        status: 404,
        headers: {
          accept: 'application/json',
        },
      }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: await hash(password, 12),
      },
    });

    return new Response(JSON.stringify({ updatedUser }), {
      status: 200,
      headers: {
        accept: 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Unable to reset password',
      }),
      {
        status: 500,
        headers: {
          accept: 'application/json',
        },
      }
    );
  }
};
