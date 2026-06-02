import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NavModeProvider } from './context/NavModeContext';
import { LayoutProvider } from './context/LayoutContext';
import { MetricsProvider } from './context/MetricsContext';
import { AlertProvider } from './context/AlertContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavModeProvider>
        <LayoutProvider>
          <MetricsProvider>
            <AlertProvider>
              <App />
            </AlertProvider>
          </MetricsProvider>
        </LayoutProvider>
      </NavModeProvider>
    </BrowserRouter>
  </StrictMode>
);
