'use client';

import { useState } from 'react';
import { Alert, Avatar, Box, Button, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { AxiosError } from 'axios';
import CustomTextField from '../components/CustomTextField';
import { useAuth } from '../context/AuthContext';
import Footer from '../footer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const registerRequest = {
      username: name,
      email: email,
      password: password,
    };

    try {
      register(registerRequest);
    } catch (err) {
      const error = err as AxiosError<{
        username: string;
        email: string;
        message: string;
      }>;
      if (error.response?.data) {
        const data = error.response.data;

        if (typeof data === 'string') {
          setErrorMessage(data);
        } else if (data.email) {
          setErrorMessage(data.email);
        } else if (data.username) {
          setErrorMessage(data.username);
        } else if (data.message) {
          setErrorMessage(data.message);
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
          flexDirection: 'column',
        }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
          }}>
          <Box
            sx={{
              p: 3,
              border: '2px solid #247d08ff',
              borderRadius: 2,
              width: { xs: '100%', sm: 400 },
              maxWidth: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 1,
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
              <CustomTextField
                name='name'
                required
                placeholder='Name'
                fullWidth
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <CustomTextField
                required
                fullWidth
                placeholder='Email'
                name='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
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
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
