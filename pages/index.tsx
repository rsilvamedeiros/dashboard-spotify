import { Button, Typography, Box } from '@mui/material';
import { signIn } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Box textAlign="center" mt={10}>
        <Typography variant="h3" gutterBottom>
          Welcome to Spotify Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please log in to access your Spotify data
        </Typography>
        <Button variant="contained" color="primary" onClick={() => signIn('spotify')}>
          Login with Spotify
        </Button>
      </Box>
    </Layout>
  );
}
