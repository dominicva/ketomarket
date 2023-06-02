import Link from 'next/link';

export const LoginButton = () => {
  return (
    <Link href="/signin">
      <button className="mr-2 p-2">Log in</button>
    </Link>
  );
};
