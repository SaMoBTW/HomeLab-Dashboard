import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavMode } from '../../context/NavModeContext';
import { useAlerts } from '../../context/AlertContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { MobileDrawer } from './MobileDrawer';
import { AlertBanner } from '../widgets/AlertBanner';
import { DashboardModule } from '../../modules/dashboard/DashboardModule';
import { ContainersModule } from '../../modules/containers/ContainersModule';
import { AnalyticsModule } from '../../modules/analytics/AnalyticsModule';
import { TerminalModule } from '../../modules/terminal/TerminalModule';
import { NAV_ITEMS } from '../../constants/navItems';

function getPageTitle(pathname: string, navMode: string, activeTab: string): string {
  if (navMode !== 'routes') {
    return NAV_ITEMS.find((i) => i.id === activeTab)?.label ?? 'Dashboard';
  }
  const item = NAV_ITEMS.find((i) =>
    i.path === '/' ? pathname === '/' : pathname.startsWith(i.path)
  );
  return item?.label ?? 'Dashboard';
}

export function AppShell() {
  const { navMode, activeTab } = useNavMode();
  const { alerts, dismissAlert } = useAlerts();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeAlerts = alerts.filter((a) => !a.dismissed);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-hud-deep">
      <Sidebar />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0">
        <TopBar
          onMenuClick={() => setDrawerOpen(true)}
          pageTitle={getPageTitle(window.location.pathname, navMode, activeTab)}
        />

        {/* Alert banners */}
        {activeAlerts.length > 0 && (
          <div className="shrink-0 px-4 pt-3 space-y-2">
            {activeAlerts.slice(0, 2).map((alert) => (
              <AlertBanner key={alert.id} alert={alert} onDismiss={dismissAlert} />
            ))}
          </div>
        )}

        {/* Content area */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          {navMode === 'routes' && (
            <Routes>
              <Route path="/" element={<DashboardModule />} />
              <Route path="/containers" element={<ContainersModule />} />
              <Route path="/analytics" element={<AnalyticsModule />} />
              <Route path="/terminal" element={<TerminalModule />} />
            </Routes>
          )}

          {navMode === 'tabs' && (
            <div className="animate-fade-in">
              {activeTab === 'dashboard' && <DashboardModule />}
              {activeTab === 'containers' && <ContainersModule />}
              {activeTab === 'analytics' && <AnalyticsModule />}
              {activeTab === 'terminal' && <TerminalModule />}
            </div>
          )}

          {navMode === 'scroll' && (
            <div>
              <section id="dashboard" className="min-h-screen">
                <DashboardModule />
              </section>
              <section id="containers" className="min-h-screen border-t border-hud-border">
                <ContainersModule />
              </section>
              <section id="analytics" className="min-h-screen border-t border-hud-border">
                <AnalyticsModule />
              </section>
              <section id="terminal" className="min-h-screen border-t border-hud-border">
                <TerminalModule />
              </section>
            </div>
          )}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
