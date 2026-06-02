import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { StatusBadge } from '../../components/widgets/StatusBadge';
import { ContainerActions } from './ContainerActions';
import type { Container } from '../../types';

interface ContainerRowProps {
  container: Container;
  isTransitioning: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart: () => void;
}

function cpuColor(cpu: number): string {
  if (cpu > 80) return '#ff4757';
  if (cpu > 50) return '#e8b34b';
  return '#00d4aa';
}

function memPct(used: number, limit: number) {
  return limit > 0 ? (used / limit) * 100 : 0;
}

export function ContainerRow({ container, isTransitioning, onStart, onStop, onRestart }: ContainerRowProps) {
  const [expanded, setExpanded] = useState(false);
  const pct = memPct(container.memory, container.memoryLimit);
  const memColor = pct > 80 ? '#ff4757' : pct > 60 ? '#e8b34b' : '#4d9fff';
  const cpuC = cpuColor(container.cpu);

  return (
    <>
      {/* Desktop row */}
      <tr className="hidden md:table-row border-b border-hud-border/50 hover:bg-white/[0.015] transition-colors group">
        <td className="py-3 px-4">
          <div className="flex flex-col gap-0.5">
            <span className="font-display font-semibold text-sm tracking-wide text-hud-text-1">{container.name}</span>
            <span className="font-mono text-[10px] text-hud-text-3">{container.id.slice(0, 12)}</span>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className="font-mono text-[11px] text-hud-text-2">
            {container.image}
            <span className="text-hud-text-3">:{container.tag}</span>
          </span>
        </td>
        <td className="py-3 px-4">
          <StatusBadge status={container.status} />
        </td>
        <td className="py-3 px-4">
          <span className="font-mono text-sm data-value" style={{ color: cpuC }}>
            {container.cpu.toFixed(1)}%
          </span>
        </td>
        <td className="py-3 px-4">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] text-hud-text-2">
              {container.memory} <span className="text-hud-text-3">/ {container.memoryLimit} MiB</span>
            </span>
            <div className="hud-bar w-20">
              <div
                className="hud-bar-fill"
                style={{ width: `${pct}%`, backgroundColor: memColor }}
              />
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className="font-mono text-[10px] text-hud-text-3">{container.uptime}</span>
        </td>
        <td className="py-3 px-4">
          <ContainerActions
            container={container}
            isTransitioning={isTransitioning}
            onStart={onStart}
            onStop={onStop}
            onRestart={onRestart}
          />
        </td>
      </tr>

      {/* Mobile row */}
      <tr className="md:hidden border-b border-hud-border/50">
        <td className="py-3 px-4" colSpan={2}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center gap-3">
              <StatusBadge status={container.status} showLabel={false} />
              <div>
                <p className="font-display font-semibold text-sm tracking-wide text-hud-text-1">{container.name}</p>
                <p className="font-mono text-[10px] text-hud-text-3">{container.image}:{container.tag}</p>
              </div>
            </div>
            <span className="text-hud-text-3">
              {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </span>
          </div>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-hud-border/50 space-y-3 animate-fade-in">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'CPU', value: `${container.cpu.toFixed(1)}%`, color: cpuC },
                  { label: 'MEM', value: `${container.memory}M`, color: '#4d9fff' },
                  { label: 'UPTIME', value: container.uptime, color: '#7a8fa6' },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <p className="label mb-1">{label}</p>
                    <p className="font-mono text-xs" style={{ color }}>{value}</p>
                  </div>
                ))}
              </div>
              <ContainerActions
                container={container}
                isTransitioning={isTransitioning}
                onStart={onStart}
                onStop={onStop}
                onRestart={onRestart}
              />
            </div>
          )}
        </td>
      </tr>
    </>
  );
}
