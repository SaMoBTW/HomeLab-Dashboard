import { ContainerRow } from './ContainerRow';
import type { Container } from '../../types';

const TH = 'py-2.5 px-4 label text-left';

interface ContainerTableProps {
  containers: Container[];
  transitioning: Set<string>;
  onStart: (id: string) => void;
  onStop: (id: string) => void;
  onRestart: (id: string) => void;
}

export function ContainerTable({ containers, transitioning, onStart, onStop, onRestart }: ContainerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full md:min-w-[700px]">
        <thead>
          <tr className="border-b border-hud-border bg-hud-overlay text-left">
            <th className={TH}>Container</th>
            <th className={`${TH} hidden md:table-cell`}>Image</th>
            <th className={`${TH} hidden md:table-cell`}>Status</th>
            <th className={`${TH} hidden md:table-cell`}>CPU</th>
            <th className={`${TH} hidden md:table-cell`}>Memory</th>
            <th className={`${TH} hidden md:table-cell`}>Uptime</th>
            <th className={`${TH} hidden md:table-cell`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {containers.map((container) => (
            <ContainerRow
              key={container.id}
              container={container}
              isTransitioning={transitioning.has(container.id)}
              onStart={() => onStart(container.id)}
              onStop={() => onStop(container.id)}
              onRestart={() => onRestart(container.id)}
            />
          ))}
        </tbody>
      </table>

      {containers.length === 0 && (
        <div className="text-center py-12 font-mono text-xs text-hud-text-3">
          No containers match the current filter.
        </div>
      )}
    </div>
  );
}
