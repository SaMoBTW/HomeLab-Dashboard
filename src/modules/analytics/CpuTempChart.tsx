import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useMetrics } from '../../context/MetricsContext';
import { WidgetCard } from '../../components/layout/WidgetCard';

const TICK = { fill: '#3a4f66', fontSize: 10, fontFamily: 'JetBrains Mono' };
const TOOLTIP_STYLE = { background: '#0d1520', border: '1px solid #1a2840', borderRadius: 0, fontSize: 11, fontFamily: 'JetBrains Mono' };

export function CpuTempChart() {
  const { temp } = useMetrics();
  const isHot  = temp.current > 75;
  const isWarm = temp.current > 60;
  const color  = isHot ? '#ff4757' : isWarm ? '#e8b34b' : '#00d4aa';
  const glow   = isHot ? 'rgba(255,71,87,0.35)' : isWarm ? 'rgba(232,179,75,0.35)' : 'rgba(0,212,170,0.35)';

  return (
    <WidgetCard title="CPU Temperature" subtitle={`${temp.current.toFixed(1)}°C`}>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-mono text-3xl font-semibold data-value" style={{ color, textShadow: `0 0 20px ${glow}` }}>
          {temp.current.toFixed(1)}
        </span>
        <span className="font-mono text-sm text-hud-text-3">°C</span>
        <span className="font-mono text-[10px] text-hud-text-3 ml-auto">60s window</span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={temp.history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#1a2840" vertical={false} />
          <XAxis dataKey="time" tick={TICK} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis domain={[30, 100]} tick={TICK} tickLine={false} axisLine={false} unit="°" />
          <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: '#7a8fa6' }} itemStyle={{ color }} formatter={(v) => [typeof v === 'number' ? `${v.toFixed(1)}°C` : v, 'Temp']} />
          <ReferenceLine y={75} stroke="rgba(255,71,87,0.25)" strokeDasharray="3 3" />
          <ReferenceLine y={60} stroke="rgba(232,179,75,0.2)" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} dot={false} isAnimationActive={false} style={{ filter: `drop-shadow(0 0 3px ${glow})` }} />
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}
