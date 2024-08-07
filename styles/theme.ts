import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
    },
    background: {
      default: '#121212',
      paper: '#181818',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
