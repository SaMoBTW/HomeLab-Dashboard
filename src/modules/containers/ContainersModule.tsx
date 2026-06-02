import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useContainers } from '../../hooks/useContainers';
import { ContainerTable } from './ContainerTable';
import type { Container } from '../../types';

type FilterStatus = 'all' | Container['status'];

const FILTERS: { value: FilterStatus; label: string; color: string }[] = [
  { value: 'all',     label: 'All',     color: '#000000' },
  { value: 'running', label: 'Running', color: '#ff1b00' },
  { value: 'paused',  label: 'Paused',  color: '#e8b34b' },
  { value: 'exited',  label: 'Exited',  color: '#b5afa6' },
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
          { label: 'Running', count: counts.running, color: '#ff1b00', border: 'border-l-[3px] border-l-[#ff1b00]' },
          { label: 'Paused',  count: counts.paused,  color: '#e8b34b', border: 'border-l-[3px] border-l-[#e8b34b]' },
          { label: 'Exited',  count: counts.exited,  color: '#b5afa6', border: 'border-l-[3px] border-l-[#b5afa6]' },
        ].map(({ label, count, color, border }) => (
          <div
            key={label}
            className={`hud-card flex items-center gap-4 p-4 ${border}`}
          >
            <span
              className="font-mono text-3xl font-semibold leading-none data-value"
              style={{ color }}
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
            style={{ caretColor: '#ff1b00' }}
          />
        </div>
        <div className="flex items-center gap-0 bg-hud-base border border-hud-border overflow-hidden">
          {FILTERS.map(({ value, label, color }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className="px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-150"
              style={{
                color:           filter === value ? color : 'var(--hud-text-2)',
                backgroundColor: filter === value ? `${color}12` : 'transparent',
                borderRight:     '1px solid var(--hud-border)',
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
