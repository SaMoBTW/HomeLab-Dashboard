import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useContainers } from '../../hooks/useContainers';
import { ContainerTable } from './ContainerTable';
import type { Container } from '../../types';

type FilterStatus = 'all' | Container['status'];

const FILTERS: { value: FilterStatus; label: string; color: string }[] = [
  { value: 'all',     label: 'All',     color: '#7a8fa6' },
  { value: 'running', label: 'Running', color: '#00d4aa' },
  { value: 'paused',  label: 'Paused',  color: '#e8b34b' },
  { value: 'exited',  label: 'Exited',  color: '#ff4757' },
];

export function ContainersModule() {
  const { containers, transitioning, startContainer, stopContainer, restartContainer } = useContainers();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filtered = useMemo(() => {
    return containers
      .filter((c) => filter === 'all' || c.status === filter)
      .filter((c) => !search || c.name.includes(search.toLowerCase()) || c.image.includes(search.toLowerCase()))
      .sort((a, b) => ({ running: 0, paused: 1, exited: 2 }[a.status] - { running: 0, paused: 1, exited: 2 }[b.status]));
  }, [containers, search, filter]);

  const counts = useMemo(() => ({
    running: containers.filter((c) => c.status === 'running').length,
    paused:  containers.filter((c) => c.status === 'paused').length,
    exited:  containers.filter((c) => c.status === 'exited').length,
  }), [containers]);

  return (
    <div className="p-4 space-y-4">
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Running', count: counts.running, color: '#00d4aa', glow: 'rgba(0,212,170,0.3)' },
          { label: 'Paused',  count: counts.paused,  color: '#e8b34b', glow: 'rgba(232,179,75,0.3)' },
          { label: 'Exited',  count: counts.exited,  color: '#ff4757', glow: 'rgba(255,71,87,0.3)' },
        ].map(({ label, count, color, glow }) => (
          <div
            key={label}
            className="hud-card flex items-center gap-4 p-4"
            style={{ borderLeft: `2px solid ${color}`, boxShadow: `inset 0 0 30px rgba(0,0,0,0.2)` }}
          >
            <span
              className="font-mono text-3xl font-semibold leading-none data-value"
              style={{ color, textShadow: `0 0 20px ${glow}` }}
            >
              {count}
            </span>
            <span className="label">{label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-hud-text-3" />
          <input
            type="text"
            placeholder="search containers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 font-mono text-xs bg-hud-base border border-hud-border text-hud-text-1 placeholder:text-hud-text-3 focus:outline-none focus:border-hud-accent/40 transition-colors"
            style={{ caretColor: '#00d4aa' }}
          />
        </div>
        <div className="flex items-center gap-0 bg-hud-base border border-hud-border overflow-hidden">
          {FILTERS.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className="px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-150"
              style={{
                color:           filter === value ? color : '#3a4f66',
                backgroundColor: filter === value ? `${color}12` : 'transparent',
                borderRight:     '1px solid #1a2840',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="hud-card">
        <ContainerTable
          containers={filtered}
          transitioning={transitioning}
          onStart={startContainer}
          onStop={stopContainer}
          onRestart={restartContainer}
        />
      </div>
    </div>
  );
}
