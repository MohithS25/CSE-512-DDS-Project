'use client';
import React from 'react';
import { Grid, Box, Typography, FormLabel, OutlinedInput, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? ''
        : 'Please enter a valid email address.',
      password: password.trim().length >= 6
        ? ''
        : 'Password must be at least 6 characters.',
    };
    setErrors(newErrors);

    // Return true if no errors exist
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('https://your-backend-url.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Login successful!');
        router.push('/homePage');
      } else {
        const data = await response.json();
        setErrors((prev) => ({
          ...prev,
          password: data.message || 'Invalid login credentials.',
        }));
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors((prev) => ({
        ...prev,
        password: 'An error occurred. Please try again.',
      }));
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {/* Email Field */}
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
        />
        {errors.email && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errors.email}
          </Typography>
        )}
        {/* Password Field */}
        <FormLabel htmlFor="password" required>
          Password
        </FormLabel>
        <OutlinedInput
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
        />
        {errors.password && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errors.password}
          </Typography>
        )}
        {/* Login Button */}
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Grid>
  );
}
