import Image from 'next/image';
import Link from 'next/link';
import { Comfortaa } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ChevronRight } from 'react-feather';
import parmesan from '../public/parmesan.png';
import eggs from '../public/eggs.png';
import broccoli from '../public/broccoli.png';
import pecans from '../public/pecans.png';
import { User } from '@/components/User';
import {
  LoginButton,
  RegisterButton,
  LogoutButton,
  ProfileButton,
} from '@/components/Buttons';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export default async function RootPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h1
          className={`${comfortaa.className} text-2xl font-semibold text-secondary`}
        >
          Ketomarket
        </h1>
        <div>
          {session?.user ? (
            <>
              <LogoutButton />
              <ProfileButton />
            </>
          ) : (
            <>
              <LoginButton />
              <RegisterButton />
            </>
          )}
        </div>
      </header>
      <main className="h-full bg-white">
        <section className="bg-off-white px-4 py-6">
          <h1>Server session</h1>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <hgroup className="mb-6">
            <h2 className="mb-6 text-3xl font-bold">
              Order keto groceries for delivery
            </h2>
            <p>
              Follow a ketogenic diet with ease. Only the highest quality
              produce.
            </p>
          </hgroup>
          <User />
          <Link href="/register">
            <button className="m-auto mb-6 block w-11/12 rounded-full bg-secondary p-4 font-semibold text-white">
              Sign up
            </button>
          </Link>
          <p>
            Have an account already?{' '}
            <button className="text-tertiary underline hover:text-accent hover:no-underline">
              <Link href="/signin">Log in</Link>
            </button>
          </p>
        </section>
        <section className="p-4">
          <h2 className="mt-4 px-4 text-center text-2xl font-bold">
            Choose from our collection of{' '}
            <span className="text-tertiary">keto-friendly</span> products
          </h2>
          <div className="mt-8">
            <ul className="flex flex-col gap-6">
              <li className="flex items-center gap-4">
                <Image
                  src={parmesan}
                  alt="parmesan"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <hgroup className="mr-auto">
                  <h3 className="text-lg font-semibold">Parmesan</h3>
                  <p className="text-sm">
                    Simply delicious{' · '}
                    <span className="font-semibold text-tertiary">$7.99</span>
                  </p>
                </hgroup>
                <ChevronRight className="opacity-50" />
              </li>
              <li className="flex items-center gap-4">
                <Image
                  src={eggs}
                  alt="eggs"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <hgroup className="mr-auto">
                  <h3 className="text-lg font-semibold">Eggs</h3>
                  <p className="text-sm">
                    Simply delicious{' · '}
                    <span className="font-semibold text-tertiary">$4.99</span>
                  </p>
                </hgroup>
                <ChevronRight className="opacity-50" />
              </li>
              <li className="flex items-center gap-4">
                <Image
                  src={broccoli}
                  alt="broccoli"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <hgroup className="mr-auto">
                  <h3 className="text-lg font-semibold">Broccoli</h3>
                  <p className="text-sm">
                    Simply delicious{' · '}
                    <span className="font-semibold text-tertiary">$2.99</span>
                  </p>
                </hgroup>
                <ChevronRight className="opacity-50" />
              </li>
              <li className="flex items-center gap-4">
                <Image
                  src={pecans}
                  alt="pecans"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <hgroup className="mr-auto">
                  <h3 className="text-lg font-semibold">Pecans</h3>
                  <p className="text-sm">
                    Simply delicious{' · '}
                    <span className="font-semibold text-tertiary">$4.99</span>
                  </p>
                </hgroup>
                <ChevronRight className="opacity-50" />
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
