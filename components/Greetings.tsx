import Link from 'next/link';
import Button from './buttons/Button';
import { ShoppingCart } from 'react-feather';

export default function Greetings({ user }: any) {
  return (
    <section className="bg-off-white px-4 py-6">
      <hgroup>
        <h1 className="mb-6 text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="mt-4 text-lg text-gray-600">
          Time to shop! We have a great selection of keto-friendly products.
        </p>
        <Link href="/profile/cart">
          <Button intent="secondary" className="mt-6 flex gap-2">
            <ShoppingCart />
            Cart (0)
          </Button>
        </Link>
      </hgroup>
    </section>
  );
}
