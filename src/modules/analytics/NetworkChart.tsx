import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMetrics } from '../../context/MetricsContext';
import { WidgetCard } from '../../components/layout/WidgetCard';

const TICK = { fill: '#4a4a46', fontSize: 10, fontFamily: 'JetBrains Mono' };
const TOOLTIP_STYLE = { background: '#ebe9e4', border: '1px solid #000000', borderRadius: 0, fontSize: 11, fontFamily: 'JetBrains Mono' };

export function NetworkChart() {
  const { network } = useMetrics();

  return (
    <WidgetCard title="Network Throughput" subtitle="Mbps">
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-hud-accent" />
          <span className="font-mono text-xs" style={{ color: '#ff1b00' }}>
            ↓ {network.inbound.toFixed(1)} <span className="text-hud-text-3">in</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-hud-amber" />
          <span className="font-mono text-xs" style={{ color: '#e8b34b' }}>
            ↑ {network.outbound.toFixed(1)} <span className="text-hud-text-3">out</span>
          </span>
        </div>
        <span className="font-mono text-[10px] text-hud-text-3 ml-auto">60s window</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={network.history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="rgba(0,0,0,0.06)" vertical={false} />
          <XAxis dataKey="time" tick={TICK} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis tick={TICK} tickLine={false} axisLine={false} unit="M" />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={{ color: '#4a4a46' }}
            formatter={(v, name) => [typeof v === 'number' ? `${v.toFixed(2)} Mbps` : v, name === 'inbound' ? '↓ In' : '↑ Out']}
          />
          <Line type="monotone" dataKey="inbound"  stroke="#ff1b00" strokeWidth={1.5} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="outbound" stroke="#e8b34b" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}
