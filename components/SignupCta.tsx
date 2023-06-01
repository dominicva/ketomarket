import Link from 'next/link';

export default function SignupCta() {
  return (
    <>
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
    </>
  );
}
