import Link from 'next/link';

export const RegisterButton = () => {
  return (
    <Link href="/register">
      <button className="rounded-full bg-secondary px-4 py-2 font-medium text-white">
        Sign up
      </button>
    </Link>
  );
};
