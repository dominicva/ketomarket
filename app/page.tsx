import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductsTeaser from '@/components/ProductsTeaser';

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="h-full bg-white">
        <Hero isLoggedIn={isLoggedIn} />
        <ProductsTeaser />
      </main>
    </>
  );
}
