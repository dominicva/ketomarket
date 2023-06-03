import Link from 'next/link';
import Button from './Button';

export const RegisterButton = () => {
  return (
    <Link href="/register">
      <Button intent="primary" size="small">
        Sign up
      </Button>
    </Link>
  );
};
