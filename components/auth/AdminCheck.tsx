'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { TwoSeventyRing } from 'react-svg-spinners';
import Card from '@/components/Card';
import Input from '@/components/Input';
import { Button } from './buttons';

export default function AdminCheck({
  adminPassword,
}: {
  adminPassword: string;
}) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (password === adminPassword) {
      setLoading(false);
      router.push('/admin/dashboard');
    } else {
      setError(true);
      setTimeout(() => {
        setLoading(false);
        setError(false);
        router.push('/');
      }, 3000);
    }
  };

  return (
    <section className="m-auto mt-6 max-w-md">
      <h1 className="mb-4 text-center text-xl font-semibold">
        So you&apos;re an admin?
      </h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="mb-1 block">
            Enter admin password
          </label>
          <div className="relative mb-6 flex">
            <input
              required={true}
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className=" w-full border-2 p-2 focus-within:outline-secondary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[0.65rem] top-[0.65rem] block"
            >
              {showPassword ? (
                <EyeOff color="#09624B" />
              ) : (
                <Eye color="#09624B" />
              )}
            </button>
          </div>

          <Button size="large" className="flex w-full justify-center">
            {loading ? <TwoSeventyRing color="white" /> : 'Submit'}
          </Button>
        </form>
        {error ? (
          <p className="mt-6 font-semibold text-accent">
            Access denied! Redirecting you to the home page...
          </p>
        ) : null}
      </Card>
    </section>
  );
}
