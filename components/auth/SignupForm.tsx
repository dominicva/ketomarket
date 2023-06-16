'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { X } from 'react-feather';
import { TwoSeventyRing } from 'react-svg-spinners';
import Input from '../Input';

const initial = { name: '', email: '', password: '' };

export default function SignupForm() {
  const [formState, setFormState] = useState({ ...initial });
  const [credentialsLoading, setCredentialsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCredentialsLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    });

    if (!res.ok) {
      alert((await res.json()).message);
      setCredentialsLoading(false);
      return;
    }

    await signIn('credentials', {
      callbackUrl: '/profile',
      email: formState.email,
      password: formState.password,
    });

    setFormState({ ...initial });
    setCredentialsLoading(false);
  }

  async function handleGoogleSignin() {
    setGoogleLoading(true);

    await signIn('google', {
      callbackUrl: '/profile',
      prompt: 'select_account',
    });

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
          className="m-auto my-6 flex h-14 w-11/12 items-center justify-center rounded-full bg-secondary font-semibold text-white shadow transition-all duration-200 focus-within:outline-accent hover:translate-y-0.5 hover:shadow-md"
          disabled={credentialsLoading}
        >
          {credentialsLoading ? <TwoSeventyRing color="white" /> : 'Sign up'}
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
        {googleLoading ? 'Loading...' : 'Sign up with Google'}
      </button>

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
