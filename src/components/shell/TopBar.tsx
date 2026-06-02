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

  return (
    <header className="relative flex items-center justify-between h-14 px-4 border-b border-hud-border bg-hud-base/90 backdrop-blur-sm shrink-0">
      {/* Subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

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
          <div className="hidden md:block w-0.5 h-5 bg-hud-accent" style={{ boxShadow: '0 0 8px var(--accent-glow)' }} />
          <h1 className="font-display font-bold text-base tracking-widest uppercase text-hud-text-1">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <NavModeToggle />

        <button
          onClick={() => setIsCustomizing(!isCustomizing)}
          title={isCustomizing ? 'Exit customize mode' : 'Customize layout'}
          className={[
            'flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-semibold tracking-widest uppercase transition-all duration-150 border',
            isCustomizing
              ? 'bg-hud-accent-dim text-hud-accent border-hud-accent/40'
              : 'text-hud-text-3 border-hud-border hover:text-hud-text-2 hover:border-hud-bright',
          ].join(' ')}
          style={isCustomizing ? { boxShadow: '0 0 12px -4px var(--accent-glow)' } : undefined}
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
              className="absolute -top-1 -right-1 w-4 h-4 bg-hud-amber text-hud-deep text-[9px] font-bold font-mono flex items-center justify-center leading-none"
              style={{ boxShadow: '0 0 8px rgba(232,179,75,0.5)' }}
            >
              {activeAlerts > 9 ? '9+' : activeAlerts}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
