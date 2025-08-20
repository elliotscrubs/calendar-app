'use client';

import { useState } from 'react';
import { userClient } from '../api/userClient';
import { useRouter } from 'next/navigation';
import { Alert, Avatar, Box, Button, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { LockOutlined } from '@mui/icons-material';
import { AxiosError } from 'axios';
import CustomTextField from '../components/CustomTextField';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const loginRequest = {
      username: username,
      password: password,
    };

    try {
      await userClient.login(loginRequest);
      router.push('/');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Wrong name or password. Please try again.');
      }
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

            {errorMessage && (
              <Alert severity='error' sx={{ mb: 2, width: '100%' }}>
                {errorMessage}
              </Alert>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CustomTextField
                required
                fullWidth
                autoFocus
                placeholder='Username'
                value={username}
                onChange={e => setUserName(e.target.value)}
              />
              <CustomTextField
                required
                fullWidth
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, backgroundColor: '#247d08ff' }}>
                Log In
              </Button>
            </form>
            <Typography variant='body2' align='center' sx={{ mt: 2 }}>
              Do not have an account?{' '}
              <Link
                sx={{ color: '#247d08ff' }}
                component={NextLink}
                href='/register'>
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
