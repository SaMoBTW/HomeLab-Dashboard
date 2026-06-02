import { X, Cpu } from 'lucide-react';
import { NavLink } from '../navigation/NavLink';
import { NAV_ITEMS } from '../../constants/navItems';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <>
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-hud-base border-r border-hud-border flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-hud-border">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 bg-hud-accent opacity-10" />
              <div className="absolute inset-0 border border-hud-accent opacity-40" />
              <Cpu size={13} className="text-hud-accent relative z-10" />
            </div>
            <div>
              <p className="font-display font-bold text-sm tracking-widest uppercase text-hud-text-1 leading-none">Homelab</p>
              <p className="font-mono text-[10px] text-hud-text-3 tracking-wider mt-0.5">COMMAND CENTER</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-hud-text-3 hover:text-hud-text-1 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 pt-5 pb-2">
          <span className="label">Navigation</span>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} item={item} onClick={onClose} />
          ))}
        </nav>
      </aside>
    </>
  );
}
