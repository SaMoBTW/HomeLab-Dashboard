/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { NavMode, TabId } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface NavModeContextValue {
  navMode: NavMode;
  setNavMode: (mode: NavMode) => void;
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const NavModeContext = createContext<NavModeContextValue | null>(null);

export function NavModeProvider({ children }: { children: ReactNode }) {
  const [navMode, setNavMode] = useLocalStorage<NavMode>('homelab:navMode', 'routes');
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  return (
    <NavModeContext.Provider value={{ navMode, setNavMode, activeTab, setActiveTab }}>
      {children}
    </NavModeContext.Provider>
  );
}

export function useNavMode(): NavModeContextValue {
  const ctx = useContext(NavModeContext);
  if (!ctx) throw new Error('useNavMode must be used within NavModeProvider');
  return ctx;
}
