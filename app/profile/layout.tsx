import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { randomString } from '@/lib/strings';
import type { ServerSession } from '@/types/ServerSession';
import Profile from '@/components/profile/Profile';

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
      id: session.user.id,
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
      image: session.user.image ?? null,
    };

    user = await prisma.user.create({
      data,
    });
  }
  return (
    <main className="m-auto max-w-5xl px-4 py-6 text-off-black lg:px-6">
      {/* @ts-expect-error Async Server Component */}
      <Profile>{children}</Profile>
    </main>
  );
}
