import { DashboardGrid } from '../../components/layout/DashboardGrid';
import { WidgetCard } from '../../components/layout/WidgetCard';
import { QuickStats } from '../../components/widgets/QuickStats';
import { QuickLinks } from '../../components/widgets/QuickLinks';

export function DashboardModule() {
  return (
    <div className="p-4 h-full">
      <DashboardGrid moduleId="dashboard">
        <div key="stats">
          <WidgetCard title="System Overview" subtitle="live">
            <QuickStats />
          </WidgetCard>
        </div>
        <div key="links">
          <WidgetCard title="Services" subtitle={`homelab`}>
            <QuickLinks />
          </WidgetCard>
        </div>
      </DashboardGrid>
    </div>
  );
}
