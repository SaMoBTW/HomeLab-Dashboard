import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useMetrics } from '../../context/MetricsContext';
import { WidgetCard } from '../../components/layout/WidgetCard';

const TICK = { fill: 'var(--hud-text-2)', fontSize: 10, fontFamily: 'JetBrains Mono' };
const TOOLTIP_STYLE = { background: 'var(--hud-base)', border: '1px solid var(--hud-border)', borderRadius: 0, fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--hud-text-1)' };

export function CpuTempChart() {
  const { temp } = useMetrics();
  const isHot  = temp.current > 75;
  const isWarm = temp.current > 60;
  const color  = isHot ? '#ff1b00' : isWarm ? '#e8b34b' : '#4a4a46';

  return (
    <WidgetCard title="CPU Temperature" subtitle={`${temp.current.toFixed(1)}°C`}>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="font-mono text-3xl font-semibold data-value" style={{ color }}>
          {temp.current.toFixed(1)}
        </span>
        <span className="font-mono text-sm text-hud-text-3">°C</span>
        <span className="font-mono text-[10px] text-hud-text-3 ml-auto">60s window</span>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={temp.history} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="time" tick={TICK} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis domain={[30, 100]} tick={TICK} tickLine={false} axisLine={false} unit="°" />
          <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: 'var(--hud-text-2)' }} itemStyle={{ color }} formatter={(v) => [typeof v === 'number' ? `${v.toFixed(1)}°C` : v, 'Temp']} />
          <ReferenceLine y={75} stroke="rgba(255,27,0,0.25)" strokeDasharray="3 3" />
          <ReferenceLine y={60} stroke="rgba(232,179,75,0.2)" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </WidgetCard>
  );
}
