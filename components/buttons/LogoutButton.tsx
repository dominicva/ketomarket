'use client';

import { signOut } from 'next-auth/react';

export const SignoutButton = () => {
  return (
    <button className="p-2" onClick={() => signOut()}>
      Sign out
    </button>
  );
};
