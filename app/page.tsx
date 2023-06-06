import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Hero from '@/components/Hero';
import ProductsTeaser from '@/components/ProductsTeaser';
import type { ServerSession } from '@/types/ServerSession';

export default async function RootPage() {
  const session: ServerSession = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user);

  if (isLoggedIn) {
    redirect('/home');
  }

  return (
    <main className="h-full bg-white">
      <Hero isLoggedIn={isLoggedIn} />
      <ProductsTeaser />
    </main>
  );
}
