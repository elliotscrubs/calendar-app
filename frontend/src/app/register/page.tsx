'use client';

import { useState } from 'react';
import { calendarClient } from '../api/calendarClient';
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const registerRequest = {
      username: name,
      email: email,
      password: password,
    };

    try {
      await calendarClient.register(registerRequest);
      setError('');
      router.push('/');
    } catch (error) {
      console.error(error);
      setError('Registration failed.');
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: 20,
          p: 3,
          border: '2px solid #1976d2',
          borderRadius: 2,
          width: 400,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}>
          <Avatar sx={{ m: 2, bgcolor: 'primary.light' }}>
            <LockOutlined />
          </Avatar>
          <Typography variant='h5'>Sign Up</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name='name'
            required
            placeholder='Name'
            fullWidth
            sx={{ width: 350 }}
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant='contained'
            sx={{ mt: 3 }}
            onClick={handleSubmit}>
            Sign Up
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Button>
          <Link component={NextLink} href='/login'>
            Already have an account? Login
          </Link>
        </Box>
      </Box>
    </>
  );
}
