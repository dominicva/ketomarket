import Link from 'next/link';
import { Session } from 'next-auth';
import { comfortaa } from '@/lib/fonts';
import {
  LoginButton,
  SignoutButton,
  ProfileButton,
  RegisterButton,
} from './buttons';

export default function Header({ session }: { session: Session | null }) {
  const isLoggedIn = Boolean(session?.user);
  const name = session?.user?.name;
  const profilePic = session?.user?.image;

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
    <header className="flex items-center justify-between p-4">
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
