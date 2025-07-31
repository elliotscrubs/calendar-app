'use client';

import { useState } from 'react';
import { calendarClient } from '../api/calendarClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await calendarClient.login(email, password);
      localStorage.setItem('token', token);
      setError('');
      router.push('/');
    } catch (error) {
      console.error(error);
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <br />
      <button type='submit'>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
