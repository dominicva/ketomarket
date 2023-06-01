import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { randomUUID } from 'crypto';
import Image from 'next/image';

export default async function Profile() {
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

  console.log(user?.image);

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 20,
        }}
      >
        {user?.image && (
          <Image
            src={String(user?.image)}
            alt={String(user?.name)}
            width={100}
            height={100}
          />
        )}
        <h3>{user?.name}</h3>
      </div>
    </main>
  );
}
