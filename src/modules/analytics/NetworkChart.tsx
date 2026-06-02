import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMetrics } from '../../context/MetricsContext';
import { WidgetCard } from '../../components/layout/WidgetCard';

const TICK = { fill: '#3a4f66', fontSize: 10, fontFamily: 'JetBrains Mono' };
const TOOLTIP_STYLE = { background: '#0d1520', border: '1px solid #1a2840', borderRadius: 0, fontSize: 11, fontFamily: 'JetBrains Mono' };

export function NetworkChart() {
  const { network } = useMetrics();

  return (
    <WidgetCard title="Network Throughput" subtitle="Mbps">
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-hud-accent" style={{ boxShadow: '0 0 4px var(--accent-glow)' }} />
          <span className="font-mono text-xs" style={{ color: '#00d4aa' }}>
            ↓ {network.inbound.toFixed(1)} <span className="text-hud-text-3">in</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-hud-amber" style={{ boxShadow: '0 0 4px rgba(232,179,75,0.4)' }} />
          <span className="font-mono text-xs" style={{ color: '#e8b34b' }}>
            ↑ {network.outbound.toFixed(1)} <span className="text-hud-text-3">out</span>
          </span>
        </div>
        <span className="font-mono text-[10px] text-hud-text-3 ml-auto">60s window</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={network.history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#1a2840" vertical={false} />
          <XAxis dataKey="time" tick={TICK} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis tick={TICK} tickLine={false} axisLine={false} unit="M" />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            labelStyle={{ color: '#7a8fa6' }}
            formatter={(v, name) => [typeof v === 'number' ? `${v.toFixed(2)} Mbps` : v, name === 'inbound' ? '↓ In' : '↑ Out']}
          />
          <Line type="monotone" dataKey="inbound"  stroke="#00d4aa" strokeWidth={1.5} dot={false} isAnimationActive={false} style={{ filter: 'drop-shadow(0 0 3px rgba(0,212,170,0.4))' }} />
          <Line type="monotone" dataKey="outbound" stroke="#e8b34b" strokeWidth={1.5} dot={false} isAnimationActive={false} style={{ filter: 'drop-shadow(0 0 3px rgba(232,179,75,0.4))' }} />
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}
