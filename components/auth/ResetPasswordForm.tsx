'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Eye, EyeOff } from 'react-feather';
import Input from '../Input';
import { Button } from '../buttons';

export default function ResetPasswordForm({ email }: { email: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const error = password !== confirmPassword;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const newPassword = e.currentTarget.password.value;

    const res = await fetch('/api/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: newPassword }),
    });

    const resData = await res.json();

    if (res.ok && resData.updatedUser) {
      setPassword('');
      setConfirmPassword('');
      setSuccessMessage(
        `Password updated for ${email}. Redirecting you to login page...`
      );
      setErrorMessage('');

      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    }

    if (resData.error) {
      setErrorMessage(resData.error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="mb-6 text-center font-medium">
          Enter your new password
        </legend>

        <div className="relative">
          <Input
            required={true}
            labelText="Password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            autocomplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-[69%] -translate-y-1/2 transform"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div className="relative">
          <Input
            required={true}
            labelText="Confirm Password"
            id="confirm-password"
            type={showPassword ? 'text' : 'password'}
            autocomplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-[69%] -translate-y-1/2 transform"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </fieldset>
      <Button
        //  @ts-expect-error
        disabled={error}
        intent={error ? 'disabled' : 'primary'}
        size="large"
        className="m-auto flex w-11/12 items-center justify-center"
      >
        {loading ? <TwoSeventyRing color="white" /> : 'Reset Password'}
      </Button>
      {error ? (
        <p className="mt-6 text-center text-lg font-semibold text-accent">
          Passwords do not match
        </p>
      ) : null}
      {successMessage ? (
        <p className="mt-6 text-center text-lg font-semibold text-green-600">
          {successMessage}
        </p>
      ) : null}
      {errorMessage ? (
        <p className="mt-6 text-center text-lg font-semibold text-accent">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
