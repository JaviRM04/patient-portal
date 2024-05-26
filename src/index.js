// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { UserProvider } from './components/UserContext';  // Importar el UserProvider

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
