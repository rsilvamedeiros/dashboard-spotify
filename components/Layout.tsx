import { Container } from '@mui/material';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
