import Image from 'next/image';
import { User } from 'react-feather';
import { getUserFromDb } from '@/lib/user';
import ProfileNav from './ProfileNav';

export default async function Profile({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromDb();

  return (
    <>
      <section>
        <figure className="flex flex-wrap items-center gap-4">
          {user?.image ? (
            <Image
              src={user.image}
              alt={String(user.name)}
              width={72}
              height={72}
              className="rounded-full"
            />
          ) : (
            <User className="h-16 w-16" />
          )}

          <figcaption>
            <h2 className=" text-xl font-semibold">{user?.name}</h2>
          </figcaption>
        </figure>
        <ProfileNav />
      </section>
      {children}
    </>
  );
}
