import { DashboardGrid } from '../../components/layout/DashboardGrid';
import { CpuTempChart } from './CpuTempChart';
import { RamLoadChart } from './RamLoadChart';
import { NetworkChart } from './NetworkChart';

export function AnalyticsModule() {
  return (
    <div className="p-4 h-full">
      <DashboardGrid moduleId="analytics">
        <div key="cpu-temp">
          <CpuTempChart />
        </div>
        <div key="ram-load">
          <RamLoadChart />
        </div>
        <div key="network">
          <NetworkChart />
        </div>
      </DashboardGrid>
    </div>
  );
}
