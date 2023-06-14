import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Greetings from '@/components/Greetings';
import ProductList from '@/components/product/ProductList';
import type { ServerSession } from '@/types';

export default async function Home() {
  const session: ServerSession = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user);

  if (!isLoggedIn) {
    redirect('/signin');
  }

  return (
    <div>
      {/* @ts-expect-error Async Server Component */}
      <Greetings id={session?.user.id} name={session?.user.name} />
      {/* @ts-expect-error Async Server Component */}
      <ProductList />
    </div>
  );
}
