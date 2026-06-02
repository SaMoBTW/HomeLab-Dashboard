import { useState, useEffect } from 'react';
import { Bell, Menu, GripHorizontal } from 'lucide-react';
import { useAlerts } from '../../context/AlertContext';
import { useLayout } from '../../context/LayoutContext';
import { NavModeToggle } from '../navigation/NavModeToggle';

interface TopBarProps {
  onMenuClick: () => void;
  pageTitle: string;
}

export function TopBar({ onMenuClick, pageTitle }: TopBarProps) {
  const { alerts } = useAlerts();
  const { isCustomizing, setIsCustomizing } = useLayout();
  const activeAlerts = alerts.filter((a) => !a.dismissed).length;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <header className="relative flex items-center justify-between h-14 px-4 border-b border-hud-border bg-hud-base shrink-0 select-none">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 text-hud-text-3 hover:text-hud-text-1 transition-colors"
        >
          <Menu size={18} />
        </button>
        <div className="flex items-center gap-3">
          {/* Vertical accent bar */}
          <div className="hidden md:block w-0.5 h-5 bg-hud-accent" />
          <h1 className="font-display font-bold text-base tracking-widest uppercase text-hud-text-1">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <NavModeToggle />

        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="hover:text-hud-text-1 text-hud-text-3 transition-colors font-mono tracking-widest uppercase font-semibold text-[9px] px-3 py-1.5 border border-hud-border bg-hud-base active:scale-95"
        >
          theme: {isDarkMode ? 'dark' : 'light'}
        </button>

        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          title={isCustomizing ? 'Exit customize mode' : 'Customize layout'}
          className={[
            'flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-semibold tracking-widest uppercase transition-all duration-150 border border-hud-border',
            isCustomizing
              ? 'bg-hud-accent text-hud-raised border-hud-border font-semibold'
              : 'text-hud-text-3 hover:text-hud-text-1 hover:bg-white/[0.02]',
          ].join(' ')}
        >
          <GripHorizontal size={13} />
          <span className="hidden sm:inline">{isCustomizing ? 'Done' : 'Customize'}</span>
        </button>

        <button
          title="Alerts"
          className="relative p-1.5 text-hud-text-3 hover:text-hud-text-1 transition-colors"
        >
          <Bell size={17} />
          {activeAlerts > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 bg-hud-accent text-hud-raised text-[9px] font-bold font-mono flex items-center justify-center leading-none border border-hud-border"
            >
              {activeAlerts > 9 ? '9+' : activeAlerts}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
