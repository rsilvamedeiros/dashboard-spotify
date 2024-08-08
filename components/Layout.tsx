// components/Layout.tsx

import React from 'react';
import { Container } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          {/* Adicione links para navegação, se necessário */}
        </nav>
      </header>
      <Container>
        {children}
      </Container>
      <footer>
        <p>&copy; 2024 Spotify Dashboard</p>
      </footer>
    </>
  );
};

export default Layout;
