'use client';

import { useState } from 'react';
import { userClient } from '../api/userClient';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { AxiosError } from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const registerRequest = {
      username: name,
      email: email,
      password: password,
    };

    try {
      await userClient.register(registerRequest);
      router.push('/login');
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          setErrorMessage(
            axiosError.response.data?.message ||
              'Email or username already exists.'
          );
        } else {
          setErrorMessage(
            axiosError.response.data?.message ||
              'Email or username already exists.'
          );
        }
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
            <Typography variant='h5'>Sign Up</Typography>

            {errorMessage && (
              <Alert severity='error' sx={{ mb: 2, width: '100%' }}>
                {errorMessage}
              </Alert>
            )}
          </Box>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name='name'
              required
              placeholder='Name'
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              placeholder='Email'
              name='email'
              value={email}
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
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name='password'
              type='password'
              placeholder='Password'
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
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant='contained'
              sx={{ mt: 3, backgroundColor: '#247d08ff' }}
              onClick={handleSubmit}>
              Sign Up
            </Button>
            <Typography variant='body2' align='center' sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link
                sx={{ color: '#247d08ff' }}
                component={NextLink}
                href='/login'>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
