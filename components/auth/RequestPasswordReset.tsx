'use client';

import { FormEvent, useState } from 'react';
import { TwoSeventyRing } from 'react-svg-spinners';
import Card from '../Card';
import Input from '../Input';
import { Button } from '../buttons';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const inputEmail = form.email.value;

    try {
      const res = await fetch('/api/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail }),
      });

      const resData = await res.json();

      if (res.ok && resData.successMessage) {
        setEmail('');
        setSuccessMessage(resData.successMessage);
        setErrorMessage('');
      }

      if (resData.error) {
        setErrorMessage(`${resData.error}. Please try again.`);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card as="section">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="mb-6 text-center font-medium">
            Enter your email to receive password reset link
          </legend>

          <Input
            required={true}
            labelText="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autocomplete="username"
          />
        </fieldset>
        <Button
          size="large"
          className="m-auto mt-4 flex w-11/12 items-center justify-center"
        >
          {loading ? <TwoSeventyRing color="white" /> : 'Send Reset Link'}
        </Button>
        {successMessage ? (
          <p className="mt-6 text-center text-lg font-semibold  text-green-600">
            {successMessage}
          </p>
        ) : null}
        {errorMessage ? (
          <p className="mt-6 text-center text-lg font-semibold text-accent">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
