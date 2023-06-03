import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductsTeaser from '@/components/ProductsTeaser';
import Greetings from '@/components/Greetings';

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="h-full bg-white">
      {isLoggedIn ? (
        <Greetings user={session?.user} />
      ) : (
        <>
          <Hero isLoggedIn={isLoggedIn} />
          <ProductsTeaser />
        </>
      )}
    </main>
  );
}
