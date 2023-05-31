'use client';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export const LoginButton = () => {
  return (
    <button className="mr-2 p-2" onClick={() => signIn()}>
      Log in
    </button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register">
      <button className="rounded-full bg-secondary px-4 py-2 font-medium text-white">
        Sign up
      </button>
    </Link>
  );
};
