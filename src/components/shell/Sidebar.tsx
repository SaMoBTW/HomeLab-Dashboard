import { ChevronLeft, ChevronRight, Cpu } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { NavLink } from '../navigation/NavLink';
import { NAV_ITEMS } from '../../constants/navItems';

export function Sidebar() {
  const [collapsed, setCollapsed] = useLocalStorage('homelab:sidebarCollapsed', false);

  return (
    <aside
      className={`hidden md:flex flex-col bg-hud-base border-r border-hud-border shrink-0 transition-all duration-200 ${
        collapsed ? 'w-14' : 'w-52'
      }`}
    >
      {/* Brand */}
      <div className={`flex items-center h-14 border-b border-hud-border px-4 shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-hud-accent opacity-10" />
          <div className="absolute inset-0 border border-hud-accent opacity-40" />
          <Cpu size={13} className="text-hud-accent relative z-10" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-display font-bold text-sm tracking-widest uppercase text-hud-text-1 leading-none">Homelab</p>
            <p className="font-mono text-[10px] text-hud-text-3 tracking-wider mt-0.5">COMMAND CENTER</p>
          </div>
        )}
      </div>

      {/* Section label */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-2">
          <span className="label">Navigation</span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.id} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* System info */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-hud-border">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-hud-accent animate-pulse-dot" />
            <span className="font-mono text-[10px] text-hud-text-3 tracking-wider">SYS ONLINE</span>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <div className={`border-t border-hud-border ${collapsed ? 'p-2' : 'p-2'}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-2 w-full px-2 py-2 text-hud-text-3 hover:text-hud-text-2 hover:bg-white/[0.02] transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          {collapsed
            ? <ChevronRight size={14} />
            : (<><ChevronLeft size={14} /><span className="label text-hud-text-3">Collapse</span></>)
          }
        </button>
      </div>
    </aside>
  );
}
