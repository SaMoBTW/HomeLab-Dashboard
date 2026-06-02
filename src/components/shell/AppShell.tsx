import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { MetricTorus } from '../widgets/MetricTorus';

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
  const [terminalOpen, setTerminalOpen] = useState(false);
  const location = useLocation();
  const activeAlerts = alerts.filter((a) => !a.dismissed);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-hud-deep text-hud-text-1">
      {/* Sidebar - collapsible desktop layout */}
      <Sidebar />

      {/* Hamburger drawer for mobile */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main container area */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Top Header bar with customizations & toggles */}
        <TopBar
          onMenuClick={() => setDrawerOpen(true)}
          pageTitle={getPageTitle(location.pathname, navMode, activeTab)}
        />

        {/* Alert banners list */}
        {activeAlerts.length > 0 && (
          <div className="shrink-0 px-4 pt-3 space-y-2 z-40">
            {activeAlerts.slice(0, 2).map((alert) => (
              <AlertBanner key={alert.id} alert={alert} onDismiss={dismissAlert} />
            ))}
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0 scroll-smooth">
          {navMode === 'routes' && (
            <Routes>
              <Route path="/" element={<DashboardModule />} />
              <Route path="/containers" element={<ContainersModule />} />
              <Route path="/analytics" element={<AnalyticsModule />} />
              <Route path="/terminal" element={<TerminalModule />} />
            </Routes>
          )}

          {navMode === 'tabs' && (
            <div className="animate-fade-in h-full">
              {activeTab === 'dashboard' && <DashboardModule />}
              {activeTab === 'containers' && <ContainersModule />}
              {activeTab === 'analytics' && <AnalyticsModule />}
              {activeTab === 'terminal' && <TerminalModule />}
            </div>
          )}

          {navMode === 'scroll' && (
            <div className="space-y-12 pb-12">
              {/* Torus visualizer hero header specifically for scroll mode */}
              <section id="hero" className="flex flex-col items-center justify-center py-12 px-4 border-b border-hud-border bg-hud-base/20">
                <MetricTorus />
                <div className="max-w-[720px] text-center mt-6 space-y-2.5">
                  <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-widest uppercase text-hud-text-1 leading-none">
                    CONTROL. MONITOR. PROTOCOL.
                  </h2>
                  <p className="font-display font-medium text-[10px] sm:text-xs leading-relaxed text-hud-text-2 uppercase max-w-[500px] mx-auto">
                    A single storytelling view of local systems, private networks, and self-hosted docker applications.
                  </p>
                </div>
              </section>

              <section id="dashboard" className="px-4">
                <div className="mb-4 border-b border-hud-border pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-hud-accent" />
                  <span className="label font-bold text-xs">Overview & Services</span>
                </div>
                <DashboardModule />
              </section>

              <section id="containers" className="px-4">
                <div className="mb-4 border-b border-hud-border pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-hud-accent" />
                  <span className="label font-bold text-xs">Docker Containers</span>
                </div>
                <ContainersModule />
              </section>

              <section id="analytics" className="px-4">
                <div className="mb-4 border-b border-hud-border pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-hud-accent" />
                  <span className="label font-bold text-xs">System Analytics</span>
                </div>
                <AnalyticsModule />
              </section>

              <section id="terminal" className="px-4">
                <div className="mb-4 border-b border-hud-border pb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-hud-accent" />
                  <span className="label font-bold text-xs">Terminal Emulator</span>
                </div>
                <div className="hud-card">
                  <TerminalModule />
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Terminal Overlay Console Trigger (accessible from anywhere) */}
      <div 
        className={`modal-overlay ${terminalOpen ? 'open' : ''}`} 
        onClick={() => setTerminalOpen(false)} 
      />
      <div className={`modal-window ${terminalOpen ? 'open' : ''}`}>
        <TerminalModule onClose={() => setTerminalOpen(false)} />
      </div>

      {/* Mobile navigation tab bar */}
      <MobileNav />
    </div>
  );
}
