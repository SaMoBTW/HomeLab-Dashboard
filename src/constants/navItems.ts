import type { TabId } from '../types';

export interface NavItem {
  id: TabId;
  label: string;
  icon: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
  { id: 'containers', label: 'Containers', icon: 'Container', path: '/containers' },
  { id: 'analytics', label: 'Analytics', icon: 'Activity', path: '/analytics' },
  { id: 'terminal', label: 'Terminal', icon: 'Terminal', path: '/terminal' },
];
