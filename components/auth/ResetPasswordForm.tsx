'use client';

import { useState, useEffect, FormEvent } from 'react';
// import { Eye, EyeOff } from 'react-feather';
import Input from '../Input';
import { Button } from '../buttons';

export default function ResetPasswordForm({ email }: { email: string }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [showPassword, setShowPassword] = useState(false);
  const error = password !== confirmPassword;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPassword = e.currentTarget.password.value;
    console.log('newPassword', newPassword);

    const res = await fetch('/api/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: newPassword }),
    });

    const resData = await res.json();

    console.log('resData', resData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="mb-6 text-center font-medium">
          Enter your new password
        </legend>

        <Input
          required={true}
          labelText="Password"
          id="password"
          type="password"
          autocomplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          required={true}
          labelText="Confirm Password"
          id="confirm-password"
          type="password"
          autocomplete="new-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </fieldset>
      <Button>Submit</Button>
      {error ? (
        <p className="mt-4 text-sm text-accent">Passwords do not match</p>
      ) : null}
    </form>
  );
}
