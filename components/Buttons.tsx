'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <Link href="/signin">
      <button className="mr-2 p-2">Log in</button>
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button className="mr-2 p-2" onClick={() => signOut()}>
      Sign out
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

export const ProfileButton = () => {
  return (
    <Link href="/profile">
      <button>Profile</button>
    </Link>
  );
};
