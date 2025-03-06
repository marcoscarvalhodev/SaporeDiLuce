import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ContextOrbitProvider } from './context/ContextOrbit.tsx';
import TextContent from './TextContent.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextOrbitProvider>
      <App />
      <TextContent />
    </ContextOrbitProvider>
  </StrictMode>
);
