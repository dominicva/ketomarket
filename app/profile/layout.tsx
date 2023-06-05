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
      image: '',
    };

    if (session.user.image) {
      data.image = String(session.user.image);
    }

    user = await prisma.user.create({
      data,
    });
  }
  return (
    <main className="px-4 py-6 text-off-black">
      <Profile session={session}>{children}</Profile>
    </main>
  );
}
