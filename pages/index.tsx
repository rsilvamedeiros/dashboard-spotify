// pages/index.tsx
import { Button, Typography, Box } from '@mui/material';
import { signIn } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Home() {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: '/dashboard' });
  };

  return (
    <Layout>
      <Box textAlign="center" mt={10}>
        <Typography variant="h3" gutterBottom>
          Welcome to Spotify Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please log in to access your Spotify data
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login with Spotify
        </Button>
      </Box>
    </Layout>
  );
}
