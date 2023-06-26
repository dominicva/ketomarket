import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
getProducts;
import Greetings from '@/components/Greetings';
import ProductList from '@/components/product/ProductList';
import type { ServerSession } from '@/types';
import { getProducts } from '@/lib/product';

export default async function Home() {
  const session: ServerSession = await getServerSession(authOptions);
  const isLoggedIn = Boolean(session?.user);
  const products = await getProducts();

  if (!isLoggedIn) {
    redirect('/signin');
  }

  return (
    <div>
      {/* @ts-expect-error Async Server Component */}
      <Greetings id={session?.user.id} />
      {/* @ts-expect-error Async Server Component */}
      <ProductList products={products} />
    </div>
  );
}
