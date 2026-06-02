import { DashboardGrid } from '../../components/layout/DashboardGrid';
import { WidgetCard } from '../../components/layout/WidgetCard';
import { QuickStats } from '../../components/widgets/QuickStats';
import { QuickLinks } from '../../components/widgets/QuickLinks';
import { ContainersModule } from '../containers/ContainersModule';
import { TerminalModule } from '../terminal/TerminalModule';
import { CpuTempChart } from '../analytics/CpuTempChart';
import { RamLoadChart } from '../analytics/RamLoadChart';
import { MetricTorus } from '../../components/widgets/MetricTorus';

export function DashboardModule() {
  return (
    <div className="p-4 h-full">
      <DashboardGrid moduleId="dashboard">
        <div key="stats">
          <WidgetCard title="System Overview" subtitle="live">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 h-full">
              <div className="flex-1 w-full">
                <QuickStats />
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <MetricTorus />
              </div>
            </div>
          </WidgetCard>
        </div>
        <div key="links">
          <WidgetCard title="Services" subtitle="links">
            <QuickLinks />
          </WidgetCard>
        </div>
        <div key="containers">
          <WidgetCard title="Docker Containers" subtitle="manager">
            <ContainersModule />
          </WidgetCard>
        </div>
        <div key="terminal">
          <WidgetCard noPad={true}>
            <TerminalModule />
          </WidgetCard>
        </div>
        <div key="analytics">
          <WidgetCard title="System Performance" subtitle="historical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full overflow-y-auto pr-1">
              <CpuTempChart />
              <RamLoadChart />
            </div>
          </WidgetCard>
        </div>
      </DashboardGrid>
    </div>
  );
}
