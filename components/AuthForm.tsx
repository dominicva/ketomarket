'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { X } from 'react-feather';
import { register, signin } from '@/lib/api';
import Input from './Input';

const registerContent = {
  linkUrl: '/signin',
  linkCaption: 'Already have an account?',
  linkText: 'Log in',
  header: 'Sign up',
  subheader: 'Just a few things to get started',
  buttonText: 'Sign up',
};

const signinContent = {
  linkUrl: '/register',
  linkCaption: "Don't have an account?",
  linkText: 'Sign up',
  header: 'Log in',
  subheader: 'Enter your credentials to log in',
  buttonText: 'Log in',
};

const initial = { name: '', email: '', password: '' };

export default function AuthForm({ mode }: { mode: 'register' | 'signin' }) {
  const [formState, setFormState] = useState({ ...initial });
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (mode === 'register') {
      await register(formState);
    } else {
      await signin(formState);
    }

    setFormState({ ...initial });
    router.replace('/home');
  }

  const content = mode === 'register' ? registerContent : signinContent;

  return (
    <div className="pt-2 text-off-black">
      <Link href="/" className="absolute">
        <X />
      </Link>
      <hgroup className="text-center">
        <h1 className="text-xl font-bold">{content.header}</h1>
        <p className="mt-4 text-lg">{content.subheader}</p>
      </hgroup>
      <form onSubmit={handleSubmit} className="mt-6">
        {mode === 'register' ? (
          <Input
            required={true}
            labelText="Name"
            id="name"
            type="text"
            value={formState.name}
            onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
          />
        ) : null}
        <Input
          required={true}
          labelText="Email"
          id="email"
          type="email"
          value={formState.email}
          onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
        />
        <Input
          required={true}
          labelText="Password"
          id="password"
          type="password"
          value={formState.password}
          onChange={e =>
            setFormState(s => ({ ...s, password: e.target.value }))
          }
        />
        <button className="m-auto my-6 block w-11/12 rounded-full bg-secondary p-4 font-semibold text-white focus-within:outline-accent">
          {content.buttonText}
        </button>
      </form>
      <p>
        {content.linkCaption}{' '}
        <Link
          href={content.linkUrl}
          className="text-tertiary underline hover:text-accent hover:no-underline"
        >
          {content.linkText}
        </Link>
      </p>
    </div>
  );
}
