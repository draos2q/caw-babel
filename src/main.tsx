import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'

import theme from 'src/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
