type Status = 'online' | 'offline' | 'running' | 'paused' | 'exited';

interface StatusBadgeProps {
  status: Status;
  showLabel?: boolean;
}

const CFG: Record<Status, { color: string; label: string }> = {
  online:  { color: '#ff1b00', label: 'ONLINE' },
  offline: { color: '#b5afa6', label: 'OFFLINE' },
  running: { color: '#ff1b00', label: 'RUNNING' },
  paused:  { color: '#e8b34b', label: 'PAUSED' },
  exited:  { color: '#b5afa6', label: 'EXITED' },
};

export function StatusBadge({ status, showLabel = true }: StatusBadgeProps) {
  const c = CFG[status];
  const pulse = status === 'running' || status === 'online';

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex items-center justify-center w-2 h-2 shrink-0">
        {pulse && (
          <span
            className="absolute inset-0 animate-ping"
            style={{ backgroundColor: c.color, opacity: 0.25 }}
          />
        )}
        <span
          className="relative w-1.5 h-1.5"
          style={{ backgroundColor: c.color }}
        />
      </span>
      {showLabel && (
        <span
          className="font-mono text-[10px] font-medium tracking-wider"
          style={{ color: c.color }}
        >
          {c.label}
        </span>
      )}
    </span>
  );
}
