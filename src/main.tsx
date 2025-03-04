import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ContextOrbitProvider } from './context/ContextOrbit.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextOrbitProvider>
      <App />
      <button
        id={'button-click'}
        className='font-[32px] bg-[white] fixed z-[999] cursor-pointer'
      >
        Click Me
      </button>

      <button
        id='close-door'
        className='top-0 right-0 font-[32px] bg-[white] fixed z-[999] cursor-pointer'
      >
        Close Door
      </button>
    </ContextOrbitProvider>
  </StrictMode>
);
