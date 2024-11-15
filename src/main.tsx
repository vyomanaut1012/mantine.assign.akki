import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        fontFamily: 'inter, sans-serif',
        fontFamilyMonospace: 'poppins, monospace',
      }}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
