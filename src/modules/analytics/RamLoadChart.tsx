import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMetrics } from '../../context/MetricsContext';
import { WidgetCard } from '../../components/layout/WidgetCard';

const TICK = { fill: '#3a4f66', fontSize: 10, fontFamily: 'JetBrains Mono' };
const TOOLTIP_STYLE = { background: '#0d1520', border: '1px solid #1a2840', borderRadius: 0, fontSize: 11, fontFamily: 'JetBrains Mono' };

export function RamLoadChart() {
  const { ram } = useMetrics();
  const color = ram.percent > 85 ? '#ff4757' : ram.percent > 65 ? '#e8b34b' : '#a855f7';
  const glow  = ram.percent > 85 ? 'rgba(255,71,87,0.35)' : ram.percent > 65 ? 'rgba(232,179,75,0.35)' : 'rgba(168,85,247,0.35)';

  return (
    <WidgetCard title="RAM Load" subtitle={`${ram.used.toFixed(1)} / ${ram.total} GB`}>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-mono text-3xl font-semibold data-value" style={{ color, textShadow: `0 0 20px ${glow}` }}>
          {ram.percent.toFixed(1)}
        </span>
        <span className="font-mono text-sm text-hud-text-3">%</span>
        <span className="font-mono text-[10px] text-hud-text-3 ml-auto">60s window</span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={ram.history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <defs>
            <linearGradient id="ramFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="#1a2840" vertical={false} />
          <XAxis dataKey="time" tick={TICK} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis domain={[0, 100]} tick={TICK} tickLine={false} axisLine={false} unit="%" />
          <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: '#7a8fa6' }} itemStyle={{ color }} formatter={(v) => [typeof v === 'number' ? `${v.toFixed(1)}%` : v, 'RAM']} />
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} fill="url(#ramFill)" dot={false} isAnimationActive={false} style={{ filter: `drop-shadow(0 0 3px ${glow})` }} />
        </AreaChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}
