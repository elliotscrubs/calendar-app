'use client';

import { useState } from 'react';
import { calendarClient } from '../api/calendarClient';
import { useRouter } from 'next/navigation';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginRequest = {
      email: email,
      password: password,
    };

    try {
      await calendarClient.login(loginRequest);
      setError('');
      router.push('/');
    } catch (error) {
      console.error(error);
      setError('Login failed.');
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url("/background.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            p: 3,
            border: '2px solid #247d08ff',
            borderRadius: 2,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}>
            <Avatar sx={{ m: 2, bgcolor: '#247d08ff' }}>
              <LockOutlined />
            </Avatar>
            <Typography variant='h5'>Log in</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              fullWidth
              sx={{
                width: 350,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#247d08ff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#247d08ff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#247d08ff',
                  },
                },
              }}
              autoFocus
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              required
              fullWidth
              sx={{
                width: 350,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#247d08ff',
                  },
                  '&:hover fieldset': {
                    borderColor: '#247d08ff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#247d08ff',
                  },
                },
              }}
              autoFocus
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, backgroundColor: '#247d08ff' }}
              onClick={handleSubmit}>
              Sign Up
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
