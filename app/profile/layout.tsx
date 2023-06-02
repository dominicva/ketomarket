import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin');
  }

  let user = await prisma.user.findUnique({
    where: {
      // id attached with next-auth callbacks.session in auth.js
      // @ts-ignore
      id: session?.user?.id,
    },
  });

  const isNewUser =
    // @ts-ignore
    !user && session?.user?.id && session?.user?.email && session?.user?.name;

  if (isNewUser) {
    const randomPassword = randomUUID();
    const data = {
      // @ts-ignore
      id: session.user.id,
      email: String(session?.user?.email),
      name: String(session?.user?.name),
      password: randomPassword,
      image: '',
    };

    if (session?.user?.image) {
      data.image = String(session?.user?.image);
    }

    user = await prisma.user.create({
      data,
    });
  }
  return (
    <main className="px-4 py-6 text-off-black">
      <section>
        <figure className="flex flex-wrap items-center gap-4">
          {user?.image && (
            <Image
              src={String(user?.image)}
              alt={String(user?.name)}
              width={60}
              height={60}
              className=" rounded-full"
            />
          )}
          <figcaption>
            <h2 className=" text-xl font-semibold">{user?.name}</h2>
          </figcaption>
        </figure>
        <nav className="mt-6 flex">
          <ul className="flex gap-4">
            <li className="border-b-2 border-off-black border-opacity-50">
              <Link href="/profile/cart">Cart</Link>
            </li>
            <li>
              <Link href="/profile/orders">Orders</Link>
            </li>
            <li>
              <Link href="/profile/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </section>
      {children}
    </main>
  );
}
