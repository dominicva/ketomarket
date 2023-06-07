'use client';

import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { X } from 'react-feather';
import Input from '../Input';

const initial = { name: '', email: '', password: '' };

export default function LoginForm() {
  const [formState, setFormState] = useState({ ...initial });
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCredentialsLoading(true);

    const result = await signIn('credentials', {
      callbackUrl: '/home',
      email: formState.email,
      password: formState.password,
    });

    if (result?.error) {
      console.error(result.error);
      setCredentialsLoading(false);
      return;
    } else {
      console.log('successful login', result);
    }

    setCredentialsLoading(false);
    setFormState({ ...initial });
  }

  async function handleGoogleSignin() {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/home', prompt: 'select_account' });
    setGoogleLoading(false);
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
          className="m-auto my-6 flex w-11/12 justify-center rounded-full bg-secondary p-4 font-semibold text-white focus-within:outline-accent"
          disabled={credentialsLoading}
        >
          {credentialsLoading ? <TwoSeventyRing color="white" /> : 'Log in'}
        </button>
      </form>
      <hr className="border-t-solid border-t-1 text-md m-auto my-8 w-11/12 overflow-visible border-off-black text-center text-off-black opacity-50 after:relative after:-top-[13px] after:bg-white after:p-2 after:content-['or']" />
      <button
        className="m-auto my-6 flex h-14 w-11/12 items-center justify-center gap-4 rounded-full border-none bg-white font-medium text-off-black shadow-md outline-none transition-all duration-200 hover:translate-y-0.5 hover:shadow-lg"
        onClick={handleGoogleSignin}
      >
        {googleLoading ? (
          <TwoSeventyRing color="black" />
        ) : (
          <Image
            src="/btn_google_light_normal.svg"
            alt="google"
            width={50}
            height={50}
          />
        )}
        {googleLoading ? 'Loading...' : 'Log in with Google'}
      </button>

      <p>
        Don&apos;t have an account?{' '}
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
