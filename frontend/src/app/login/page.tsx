'use client';

import { useState } from 'react';
import { Alert, Avatar, Box, Button, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { LockOutlined } from '@mui/icons-material';
import CustomTextField from '../components/CustomTextField';
import { useAuth } from '../context/AuthContext';
import Footer from '../footer';

export default function LoginPage() {
  const { login } = useAuth();
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

    login(loginRequest);
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
            px: 2
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
              <Typography variant='h5'>Log in</Typography>

              {errorMessage && (
                <Alert severity='error' sx={{ mb: 2, width: '100%' }}>
                  {errorMessage}
                </Alert>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
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
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
