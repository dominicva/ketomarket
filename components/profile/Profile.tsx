import Image from 'next/image';
import ProfileNav from './ProfileNav';
import type { ProfileProps } from '@/types';

export default function Profile({ session, children }: ProfileProps) {
  const user = session?.user;

  return (
    <>
      <section>
        <figure className="flex flex-wrap items-center gap-4">
          {user?.image && user?.name && (
            <Image
              src={user.image}
              alt={user.name}
              width={60}
              height={60}
              className=" rounded-full"
            />
          )}
          <figcaption>
            <h2 className=" text-xl font-semibold">{user?.name}</h2>
          </figcaption>
        </figure>
        <ProfileNav session={session} />
      </section>
      {children}
    </>
  );
}
