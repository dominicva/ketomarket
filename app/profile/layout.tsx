import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { randomString } from '@/lib/randomString';
import type { ServerSession } from '@/types/ServerSession';
import ProfileNav from '@/components/profile/ProfileNav';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: ServerSession = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  let user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const isNewUser =
    !user && session.user.id && session.user.email && session.user.name;

  if (isNewUser) {
    const data = {
      id: session.user.id,
      email: String(session?.user?.email),
      name: String(session?.user?.name),
      password: randomString(),
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
        <ProfileNav />
        {/* <nav className="mt-6 flex">
          <ul className="flex gap-6">
            <li className="flex items-end gap-2 border-b-2 border-off-black border-opacity-50 py-2">
              <ShoppingCart />
              <Link href="/profile/cart">Cart</Link>
            </li>
            <li className="flex items-end gap-2 border-b-2 border-off-black border-opacity-50 py-2">
              <List />
              <Link href="/profile/orders">Orders</Link>
            </li>
            <li className="flex items-end gap-2 border-b-2 border-off-black border-opacity-50 py-2">
              <Settings />
              <Link href="/profile/settings">Settings</Link>
            </li>
          </ul>
        </nav> */}
      </section>
      {children}
    </main>
  );
}
