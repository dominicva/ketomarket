import { Session, getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Hero from '@/components/Hero';
import ProductsTeaser from '@/components/ProductsTeaser';
import Greetings from '@/components/Greetings';

type ServerSession =
  | ({
      user: {
        id: string;
      };
    } & Session)
  | null;

export default async function RootPage() {
  const session: ServerSession = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user);

  return (
    <main className="h-full bg-white">
      {session?.user?.id && isLoggedIn ? (
        /* @ts-expect-error Async Server Component */
        <Greetings id={session?.user.id} name={session?.user.name} />
      ) : (
        <>
          <Hero isLoggedIn={isLoggedIn} />
          <ProductsTeaser />
        </>
      )}
    </main>
  );
}
