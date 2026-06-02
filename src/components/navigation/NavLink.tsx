import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Container, Activity, Terminal } from 'lucide-react';
import { useNavMode } from '../../context/NavModeContext';
import type { NavItem } from '../../constants/navItems';
import type { TabId } from '../../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={16} />,
  Container:       <Container size={16} />,
  Activity:        <Activity size={16} />,
  Terminal:        <Terminal size={16} />,
};

interface NavLinkProps {
  item: NavItem;
  collapsed?: boolean;
  onClick?: () => void;
}

export function NavLink({ item, collapsed = false, onClick }: NavLinkProps) {
  const { navMode, activeTab, setActiveTab } = useNavMode();
  const location = useLocation();

  const isActive =
    navMode === 'routes'
      ? item.path === '/'
        ? location.pathname === '/'
        : location.pathname.startsWith(item.path)
      : activeTab === item.id;

  const baseClass = [
    'relative flex items-center gap-3 px-3 py-2.5 text-xs transition-all duration-150 group select-none',
    'font-display font-semibold tracking-widest uppercase',
    isActive
      ? 'text-hud-accent bg-hud-accent-dim border-l-2 border-hud-accent'
      : 'text-hud-text-2 hover:text-hud-text-1 hover:bg-white/[0.02] border-l-2 border-transparent',
  ].join(' ');

  const content = (
    <>
      <span className={`shrink-0 ${isActive ? 'text-hud-accent' : 'text-hud-text-3 group-hover:text-hud-text-2'} transition-colors`}>
        {ICON_MAP[item.icon]}
      </span>
      {!collapsed && <span>{item.label}</span>}
    </>
  );

  if (navMode === 'routes') {
    return <Link to={item.path} className={baseClass} onClick={onClick}>{content}</Link>;
  }
  if (navMode === 'scroll') {
    return (
      <a
        href={`#${item.id}`}
        className={baseClass}
        onClick={(e) => {
          e.preventDefault();
          setActiveTab(item.id as TabId);
          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
          onClick?.();
        }}
      >
        {content}
      </a>
    );
  }
  return (
    <button className={`${baseClass} w-full text-left`} onClick={() => { setActiveTab(item.id as TabId); onClick?.(); }}>
      {content}
    </button>
  );
}
