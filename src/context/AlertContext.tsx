/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { SystemAlert } from '../types';

interface AlertContextValue {
  alerts: SystemAlert[];
  addAlert: (a: Omit<SystemAlert, 'id' | 'timestamp' | 'dismissed'>) => void;
  dismissAlert: (id: string) => void;
  clearAll: () => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

const INITIAL_ALERTS: SystemAlert[] = [
  {
    id: 'init-1',
    type: 'warning',
    message: 'home-assistant container has stopped unexpectedly',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    dismissed: false,
  },
  {
    id: 'init-2',
    type: 'info',
    message: 'Watchtower found updates for 2 containers',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    dismissed: false,
  },
];

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);

  function addAlert(a: Omit<SystemAlert, 'id' | 'timestamp' | 'dismissed'>) {
    setAlerts((prev) => [
      { ...a, id: crypto.randomUUID(), timestamp: new Date(), dismissed: false },
      ...prev,
    ]);
  }

  function dismissAlert(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, dismissed: true } : a)));
  }

  function clearAll() {
    setAlerts((prev) => prev.map((a) => ({ ...a, dismissed: true })));
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, dismissAlert, clearAll }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts(): AlertContextValue {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlerts must be used within AlertProvider');
  return ctx;
}
