import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export default function RootPage() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h1
          className={`${comfortaa.className} text-2xl font-semibold text-secondary`}
        >
          Ketomarket
        </h1>
        <div>
          <button className="mr-2 p-2">Log in</button>
          <button className="rounded-full bg-secondary px-4 py-2 font-medium text-white">
            Sign up
          </button>
        </div>
      </header>
      <main className="h-full bg-white">
        <section className="bg-off-white p-4">
          <hgroup className="mb-6">
            <h2 className="mb-6 text-3xl font-bold">
              Order keto groceries for delivery
            </h2>
            <p>
              Follow a ketogenic diet with ease. Only the highest quality
              produce.
            </p>
          </hgroup>
          <button className="m-auto mb-6 block w-11/12 rounded-full bg-secondary p-4 font-semibold text-white">
            Sign up
          </button>
          <p>
            Have an account already?{' '}
            <button className="text-secondary underline hover:no-underline">
              Login
            </button>
          </p>
        </section>
      </main>
    </>
  );
}
