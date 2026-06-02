/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ResponsiveLayouts } from 'react-grid-layout';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  DEFAULT_DASHBOARD_LAYOUTS,
  DEFAULT_ANALYTICS_LAYOUTS,
} from '../constants/defaultLayouts';

type ModuleId = 'dashboard' | 'analytics';

interface ModuleLayouts {
  dashboard: ResponsiveLayouts;
  analytics: ResponsiveLayouts;
}

interface LayoutContextValue {
  layouts: ModuleLayouts;
  setModuleLayouts: (moduleId: ModuleId, layouts: ResponsiveLayouts) => void;
  isCustomizing: boolean;
  setIsCustomizing: (v: boolean) => void;
}

const DEFAULT_LAYOUTS: ModuleLayouts = {
  dashboard: DEFAULT_DASHBOARD_LAYOUTS,
  analytics: DEFAULT_ANALYTICS_LAYOUTS,
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layouts, setLayouts] = useLocalStorage<ModuleLayouts>(
    'homelab:gridLayouts',
    DEFAULT_LAYOUTS
  );
  const [isCustomizing, setIsCustomizing] = useState(false);

  function setModuleLayouts(moduleId: ModuleId, newLayouts: ResponsiveLayouts) {
    setLayouts((prev) => ({ ...prev, [moduleId]: newLayouts }));
  }

  return (
    <LayoutContext.Provider value={{ layouts, setModuleLayouts, isCustomizing, setIsCustomizing }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout(): LayoutContextValue {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used within LayoutProvider');
  return ctx;
}
