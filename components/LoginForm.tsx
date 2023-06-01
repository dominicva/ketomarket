'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { X } from 'react-feather';
import Input from './Input';

const initial = { name: '', email: '', password: '' };

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ ...initial });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      callbackUrl: '/',
      email: formState.email,
      password: formState.password,
    });

    if (result?.error) {
      console.error(result.error);
      setLoading(false);
      return;
    } else {
      console.log('successful login', result);
    }

    setLoading(false);
    setFormState({ ...initial });
  }

  async function handleGoogleSignin() {
    await signIn('google', { callbackUrl: '/', prompt: 'select_account' });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  return (
    <div className="pt-2 text-off-black">
      <Link href="/" className="absolute">
        <X />
      </Link>
      <hgroup className="text-center">
        <h1 className="text-xl font-bold">Log in</h1>
        <p className="mt-4 text-lg">Enter your credentials to log in</p>
      </hgroup>
      <form onSubmit={handleSubmit} className="mt-6">
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
          autocomplete="current-password"
        />
        <button
          className="m-auto my-6 block w-11/12 rounded-full bg-secondary p-4 font-semibold text-white focus-within:outline-accent"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Log in'}
        </button>
      </form>
      <hr className="border-t-solid border-t-1 text-md m-auto my-8 w-11/12 overflow-visible border-off-black text-center text-off-black opacity-50 after:relative after:-top-[13px] after:bg-white after:p-2 after:content-['or']" />
      <button
        className="m-auto my-6 block w-11/12 rounded-full border-none bg-white p-4 font-semibold text-off-black shadow-md outline-none transition-all duration-200 hover:translate-y-0.5 hover:shadow-lg"
        onClick={handleGoogleSignin}
      >
        {loading ? 'Loading...' : 'Log in with Google'}
      </button>

      <p>
        Don't have an account?{' '}
        <Link
          href="/register"
          className="text-tertiary underline hover:text-accent hover:no-underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
