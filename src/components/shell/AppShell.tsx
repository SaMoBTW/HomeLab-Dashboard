import { useState, useEffect } from 'react';
import { useAlerts } from '../../context/AlertContext';
import { AlertBanner } from '../widgets/AlertBanner';
import { TerminalModule } from '../../modules/terminal/TerminalModule';
import { MetricTorus } from '../widgets/MetricTorus';
import { QuickStats } from '../widgets/QuickStats';
import { QuickLinks } from '../widgets/QuickLinks';
import { ContainersModule } from '../../modules/containers/ContainersModule';
import { CpuTempChart } from '../../modules/analytics/CpuTempChart';
import { RamLoadChart } from '../../modules/analytics/RamLoadChart';
import { NetworkChart } from '../../modules/analytics/NetworkChart';

export function AppShell() {
  const { alerts, dismissAlert } = useAlerts();
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<'stats' | 'containers' | 'analytics' | null>(null);

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
  
  const activeAlerts = alerts.filter((a) => !a.dismissed);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-hud-deep text-hud-text-1">
      
      {/* FIXED HEADER */}
      <header className="relative flex items-center justify-between h-14 px-8 border-b border-hud-border bg-hud-base shrink-0 select-none z-50">
        {/* Left: Terminal Toggle */}
        <button
          onClick={() => setTerminalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 border border-hud-border font-mono text-[9px] font-semibold tracking-widest uppercase bg-[#141414] text-hud-accent hover:bg-black/10 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-hud-accent animate-pulse-dot" />
          homelab - bash
        </button>

        {/* Center: Brand */}
        <span className="font-display font-bold text-sm tracking-widest uppercase text-hud-text-1">
          HOMELAB
        </span>

        {/* Right: Section Navigation */}
        <nav className="flex items-center gap-6 font-display font-bold text-[9px] tracking-widest uppercase text-hud-text-3">
          <a href="#overview" className="hover:text-hud-text-1 transition-colors">Overview</a>
          <a href="#metrics" className="hover:text-hud-text-1 transition-colors">Metrics</a>
          <span className="w-px h-3 bg-hud-border/20" />
          <button
            onClick={toggleTheme}
            className="hover:text-hud-text-1 transition-colors font-mono tracking-widest uppercase font-semibold text-[9px]"
          >
            theme: {isDarkMode ? 'dark' : 'light'}
          </button>
        </nav>
      </header>

      {/* ALERT BANNERS */}
      {activeAlerts.length > 0 && (
        <div className="shrink-0 px-8 pt-3 space-y-2 z-40 bg-hud-deep">
          {activeAlerts.slice(0, 1).map((alert) => (
            <AlertBanner key={alert.id} alert={alert} onDismiss={dismissAlert} />
          ))}
        </div>
      )}

      {/* MODAL TERMINAL OVERLAY */}
      <div 
        className={`modal-overlay ${terminalOpen ? 'open' : ''}`} 
        onClick={() => setTerminalOpen(false)} 
      />
      <div className={`modal-window ${terminalOpen ? 'open' : ''}`}>
        <TerminalModule onClose={() => setTerminalOpen(false)} />
      </div>

      {/* MAIN SINGLE PAGE SCROLLER */}
      <main className="flex-1 overflow-y-auto pb-8 scroll-smooth">
        
        {/* HERO SECTION */}
        <section id="overview" className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center py-12 px-8">
          <MetricTorus />
          
          <div className="max-w-[720px] text-center mt-8 space-y-4">
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-widest uppercase text-hud-text-1 leading-none">
              CONTROL. MONITOR. PROTOCOL. AND. SELF-HOSTING.
            </h2>
            <p className="font-display font-medium text-xs sm:text-sm leading-relaxed text-hud-text-2 uppercase max-w-[620px] mx-auto">
              Rejecting the cloud to explore the emerging intersection of local systems, private networks, and self-hosted apps. We do this through self-hosting, not subscription.
            </p>
          </div>
        </section>

        {/* HORIZONTAL CARDS SECTION */}
        <section id="metrics" className="hscroll-frame">
          <div className="hscroll-track">
            
            {/* Card 1: Stats & Services Links */}
            <div className={`hcard ${expandedCard === 'stats' ? 'hcard--expanded' : ''}`}>
              <div className="flex items-center justify-between mb-4 shrink-0 border-b border-hud-border pb-3">
                <span className="label font-bold text-xs tracking-widest text-hud-text-1">System Overview & Services</span>
                <button 
                  onClick={() => setExpandedCard(expandedCard === 'stats' ? null : 'stats')}
                  className="font-mono text-[9px] uppercase tracking-wider text-hud-accent border border-hud-border bg-hud-base px-2 py-1 font-semibold"
                >
                  {expandedCard === 'stats' ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1 space-y-6">
                <QuickStats />
                <QuickLinks />
              </div>
            </div>

            {/* Card 2: Docker Containers */}
            <div className={`hcard ${expandedCard === 'containers' ? 'hcard--expanded' : ''} bg-[#0a0a0a] text-[#e4e3e0] border-l-0 border-r-0`}>
              <div className="flex items-center justify-between mb-4 shrink-0 border-b border-hud-border/20 pb-3">
                <span className="label font-bold text-xs tracking-widest text-[#f2f1ec]">Docker Containers</span>
                <button 
                  onClick={() => setExpandedCard(expandedCard === 'containers' ? null : 'containers')}
                  className="font-mono text-[9px] uppercase tracking-wider text-hud-accent border border-hud-border/40 bg-[#141414] px-2 py-1 font-semibold"
                >
                  {expandedCard === 'containers' ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1">
                <ContainersModule />
              </div>
            </div>

            {/* Card 3: Performance Charts */}
            <div className={`hcard ${expandedCard === 'analytics' ? 'hcard--expanded' : ''}`}>
              <div className="flex items-center justify-between mb-4 shrink-0 border-b border-hud-border pb-3">
                <span className="label font-bold text-xs tracking-widest text-hud-text-1">Performance Analytics</span>
                <button 
                  onClick={() => setExpandedCard(expandedCard === 'analytics' ? null : 'analytics')}
                  className="font-mono text-[9px] uppercase tracking-wider text-hud-accent border border-hud-border bg-hud-base px-2 py-1 font-semibold"
                >
                  {expandedCard === 'analytics' ? 'Collapse' : 'Expand'}
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <CpuTempChart />
                <RamLoadChart />
                <div className="md:col-span-2">
                  <NetworkChart />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 text-center select-none">
          <span className="font-display font-extrabold text-[8vw] sm:text-[10vw] tracking-tighter uppercase text-hud-text-3 leading-none opacity-10">
            HOMELAB
          </span>
        </footer>

      </main>

    </div>
  );
}
