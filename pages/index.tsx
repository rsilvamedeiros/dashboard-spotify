// pages/index.tsx

import { Button, Typography, Box, Container } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={10}>
          <Typography variant="h3" gutterBottom>
            Welcome to Spotify Dashboard
          </Typography>
          {session ? (
            <>
              <Typography variant="h5" gutterBottom>
                You are logged in as {session.user?.name || 'User'}
              </Typography>
              <Button variant="contained" color="primary" href="/dashboard">
                Go to Dashboard
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Please log in to access your Spotify data
              </Typography>
              <Button variant="contained" color="primary" onClick={() => signIn('spotify', { callbackUrl: '/dashboard' })}>
                Login with Spotify
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Layout>
  );
}
