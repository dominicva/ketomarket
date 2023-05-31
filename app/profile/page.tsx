import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: {
      // id attached with next-auth callbacks.session in auth.js
      // @ts-ignore
      id: session?.user?.id,
    },
  });

  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 20,
        }}
      >
        <h3>{user?.name}</h3>
      </div>
    </main>
  );
}
