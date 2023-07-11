'use client';

import { FormEvent, useState } from 'react';
import Card from '../Card';
import Input from '../Input';
import { Button } from '../buttons';

export default function RequestPasswordReset() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputEmail = form.email.value;

    const res = await fetch('/api/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inputEmail }),
    });

    const resData = await res.json();

    console.log('resData', resData);

    if (res.ok) {
      setEmail('');
      setSuccessMessage('Check your email for a password reset link.');
    }

    if (resData.error) {
      setErrorMessage(resData.error);
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
            onChange={e => setEmail(e.target.value)}
            autocomplete="username"
          />
        </fieldset>
        <Button>Submit</Button>
      </form>
    </Card>
  );
}
