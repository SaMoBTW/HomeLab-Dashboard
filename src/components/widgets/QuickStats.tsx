import { Cpu, MemoryStick, HardDrive, Wifi } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useMetrics } from '../../context/MetricsContext';

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  subValue?: string;
  icon: React.ReactNode;
  percent: number;
  history: { value: number }[];
  accentColor: string;
  glowColor: string;
}

function StatCard({ label, value, unit, subValue, icon, percent, history, accentColor, glowColor }: StatCardProps) {
  const statusColor =
    percent > 85 ? '#ff4757' :
    percent > 65 ? '#e8b34b' :
    accentColor;

  const statusGlow =
    percent > 85 ? 'rgba(255,71,87,0.35)' :
    percent > 65 ? 'rgba(232,179,75,0.35)' :
    glowColor;

  return (
    <div className="hud-card flex flex-col gap-0 overflow-hidden">
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full transition-colors duration-700"
        style={{ backgroundColor: statusColor, boxShadow: `0 0 8px ${statusGlow}` }}
      />

      <div className="p-4 flex flex-col gap-3">
        {/* Label row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span style={{ color: statusColor }}>{icon}</span>
            <span className="label">{label}</span>
          </div>
          <span
            className="font-mono text-[10px] font-medium"
            style={{ color: statusColor }}
          >
            {percent.toFixed(0)}%
          </span>
        </div>

        {/* Big number + sparkline */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className="font-mono text-2xl font-semibold leading-none data-value"
                style={{ color: statusColor, textShadow: `0 0 20px ${statusGlow}` }}
              >
                {value}
              </span>
              <span className="font-mono text-xs text-hud-text-3">{unit}</span>
            </div>
            {subValue && (
              <p className="font-mono text-[10px] text-hud-text-3 mt-1">{subValue}</p>
            )}
          </div>
          <div className="h-10 w-20 opacity-70">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history.slice(-20)}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={statusColor}
                  strokeWidth={1.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Thin progress bar */}
        <div className="hud-bar">
          <div
            className="hud-bar-fill"
            style={{
              width: `${Math.min(percent, 100)}%`,
              backgroundColor: statusColor,
              boxShadow: `0 0 6px ${statusGlow}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function QuickStats() {
  const { cpu, ram, network, storage } = useMetrics();
  const networkPct = Math.min((network.inbound / 80) * 100, 100);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      <StatCard
        label="CPU"
        value={cpu.current.toFixed(1)}
        unit="%"
        icon={<Cpu size={13} />}
        percent={cpu.current}
        history={cpu.history}
        accentColor="#4d9fff"
        glowColor="rgba(77,159,255,0.35)"
      />
      <StatCard
        label="Memory"
        value={ram.used.toFixed(1)}
        unit="GB"
        subValue={`/ ${ram.total} GB`}
        icon={<MemoryStick size={13} />}
        percent={ram.percent}
        history={ram.history}
        accentColor="#a855f7"
        glowColor="rgba(168,85,247,0.35)"
      />
      <StatCard
        label="Storage"
        value={storage.used.toFixed(1)}
        unit="TB"
        subValue={`/ ${storage.total} TB`}
        icon={<HardDrive size={13} />}
        percent={storage.percent}
        history={[...Array(20)].map(() => ({ value: storage.percent }))}
        accentColor="#e8b34b"
        glowColor="rgba(232,179,75,0.35)"
      />
      <StatCard
        label="Network"
        value={network.inbound.toFixed(1)}
        unit="Mbps"
        subValue={`↑ ${network.outbound.toFixed(1)} out`}
        icon={<Wifi size={13} />}
        percent={networkPct}
        history={network.history.map((p) => ({ value: p.inbound }))}
        accentColor="#00d4aa"
        glowColor="rgba(0,212,170,0.35)"
      />
    </div>
  );
}
