import Link from 'next/link';
import { Button } from './buttons';

export default function SignupCta() {
  return (
    <>
      <Link href="/register">
        <Button
          intent="primary"
          size="large"
          className="m-auto mb-6 block w-11/12"
        >
          Sign up
        </Button>
      </Link>
      <p>
        Have an account already?{' '}
        <Link href="/signin">
          <button className="text-tertiary underline hover:text-accent hover:no-underline">
            Log in
          </button>
        </Link>
      </p>
    </>
  );
}
