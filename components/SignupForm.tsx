'use client';

import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { X } from 'react-feather';
import Input from './Input';

const initial = { name: '', email: '', password: '' };

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...initial });
  //   const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // if (mode === 'register') {
    //   const res = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formState),
    //   });
    //   setLoading(false);
    //   if (!res.ok) {
    //     alert((await res.json()).message);
    //     return;
    //   }

    //   signIn(undefined, { callbackUrl: '/' });
    // }

    setFormState({ ...initial });
    setLoading(false);
    // router.replace('/');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  //   const content = mode === 'register' ? registerContent : signinContent;

  return (
    <div className="pt-2 text-off-black">
      <Link href="/" className="absolute">
        <X />
      </Link>
      <hgroup className="text-center">
        <h1 className="text-xl font-bold">Sign up</h1>
        <p className="mt-4 text-lg">Just a few things to get started</p>
      </hgroup>
      <form onSubmit={handleSubmit} className="mt-6">
        <Input
          required={true}
          labelText="Name"
          id="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
          autocomplete="name"
        />

        <Input
          required={true}
          labelText="Email"
          id="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          autocomplete="username"
        />
        <Input
          required={true}
          labelText="Password"
          id="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
          autocomplete="new-password"
        />
        <button
          className="m-auto my-6 block w-11/12 rounded-full bg-secondary p-4 font-semibold text-white focus-within:outline-accent"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <Link
          href="/signin"
          className="text-tertiary underline hover:text-accent hover:no-underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
