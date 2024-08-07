import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Spotify Dashboard
        </Typography>
        {!session ? (
          <Button color="inherit" onClick={() => signIn('spotify')}>
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={() => signOut()}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
