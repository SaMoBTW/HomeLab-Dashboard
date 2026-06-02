import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Container, Activity, Terminal } from 'lucide-react';
import { useNavMode } from '../../context/NavModeContext';
import { NAV_ITEMS } from '../../constants/navItems';
import type { TabId } from '../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={19} />,
  Container:       <Container size={19} />,
  Activity:        <Activity size={19} />,
  Terminal:        <Terminal size={19} />,
};

export function MobileNav() {
  const { navMode, activeTab, setActiveTab } = useNavMode();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-hud-base/95 backdrop-blur border-t border-hud-border flex">
      {NAV_ITEMS.map((item) => {
        const isActive =
          navMode === 'routes'
            ? item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
            : activeTab === item.id;

        const inner = (
          <>
            {isActive && (
              <span
                className="absolute top-0 left-0 right-0 h-0.5 bg-hud-accent"
                style={{ boxShadow: '0 0 8px var(--accent-glow)' }}
              />
            )}
            <span className={`transition-colors ${isActive ? 'text-hud-accent' : 'text-hud-text-3'}`}>
              {ICON_MAP[item.icon]}
            </span>
            <span className={`font-display font-semibold text-[9px] tracking-widest uppercase mt-0.5 ${
              isActive ? 'text-hud-accent' : 'text-hud-text-3'
            }`}>
              {item.label}
            </span>
          </>
        );

        const cls = 'relative flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all active:scale-95';

        if (navMode === 'routes') return <Link key={item.id} to={item.path} className={cls}>{inner}</Link>;
        if (navMode === 'scroll') return (
          <a key={item.id} href={`#${item.id}`} className={cls}
            onClick={(e) => { e.preventDefault(); setActiveTab(item.id as TabId); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}>
            {inner}
          </a>
        );
        return <button key={item.id} className={cls} onClick={() => setActiveTab(item.id as TabId)}>{inner}</button>;
      })}
    </nav>
  );
}
