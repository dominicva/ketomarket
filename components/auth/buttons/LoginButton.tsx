import Link from 'next/link';
import { Button } from './Button';

export const LoginButton = () => {
  return (
    <Link href="/signin">
      <Button intent="tertiary" size="small">
        Log in
      </Button>
    </Link>
  );
};
