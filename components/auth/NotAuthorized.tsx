'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotAuthorized() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <main className="p-6">
      <section className="m-auto max-w-sm">
        <h1 className="mb-4 text-2xl font-bold text-secondary">
          Not Authorized
        </h1>
        <p className="">
          You are not authorized to access this page and will be redirected to
          the home page shortly...
        </p>
      </section>
    </main>
  );
}
