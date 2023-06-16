import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserFromDb } from '@/lib/user';
import { comfortaa } from '@/lib/fonts';
import {
  LoginButton,
  SignoutButton,
  ProfileButton,
  RegisterButton,
} from './buttons';
import type { ServerSession } from '@/types';

export default async function Header() {
  const serverSession: ServerSession = await getServerSession(authOptions);
  const user = await getUserFromDb();
  const isLoggedIn = Boolean(serverSession?.user);
  const name = user?.name;
  const profilePic = user?.image;

  const buttons = isLoggedIn ? (
    <>
      <SignoutButton />
      <ProfileButton name={name ?? null} imageSrc={profilePic ?? null} />
    </>
  ) : (
    <>
      <LoginButton />
      <RegisterButton />
    </>
  );

  return (
    <header className="m-auto flex max-w-5xl items-center justify-between p-4 lg:p-6">
      <Link href="/">
        <h1
          className={`${comfortaa.className} text-2xl font-semibold text-secondary`}
        >
          Ketomarket
        </h1>
      </Link>
      <div className="flex items-center gap-4">{buttons}</div>
    </header>
  );
}
