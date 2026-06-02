import { Layers, AlignJustify, Rows3 } from 'lucide-react';
import { useNavMode } from '../../context/NavModeContext';
import type { NavMode } from '../../types';

const MODES: { mode: NavMode; icon: React.ReactNode; label: string }[] = [
  { mode: 'routes', icon: <Layers size={12} />,      label: 'Pages' },
  { mode: 'tabs',   icon: <Rows3 size={12} />,       label: 'Tabs' },
  { mode: 'scroll', icon: <AlignJustify size={12} />, label: 'Scroll' },
];

export function NavModeToggle() {
  const { navMode, setNavMode } = useNavMode();

  return (
    <div className="flex items-center gap-px bg-hud-deep border border-hud-border p-0.5">
      {MODES.map(({ mode, icon, label }) => (
        <button
          key={mode}
          onClick={() => setNavMode(mode)}
          title={`${label} mode`}
          className={[
            'flex items-center gap-1.5 px-2 py-1 text-xs font-display font-semibold tracking-widest uppercase transition-all duration-150',
            navMode === mode
              ? 'bg-hud-accent-dim text-hud-accent'
              : 'text-hud-text-3 hover:text-hud-text-2',
          ].join(' ')}
        >
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
