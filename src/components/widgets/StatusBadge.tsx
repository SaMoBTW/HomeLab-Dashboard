type Status = 'online' | 'offline' | 'running' | 'paused' | 'exited';

interface StatusBadgeProps {
  status: Status;
  showLabel?: boolean;
}

const CFG: Record<Status, { color: string; glow: string; label: string }> = {
  online:  { color: '#00d4aa', glow: 'rgba(0,212,170,0.6)',   label: 'ONLINE' },
  offline: { color: '#3a4f66', glow: 'transparent',            label: 'OFFLINE' },
  running: { color: '#00d4aa', glow: 'rgba(0,212,170,0.6)',   label: 'RUNNING' },
  paused:  { color: '#e8b34b', glow: 'rgba(232,179,75,0.6)',  label: 'PAUSED' },
  exited:  { color: '#ff4757', glow: 'rgba(255,71,87,0.6)',   label: 'EXITED' },
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
            style={{ backgroundColor: c.color, opacity: 0.4 }}
          />
        )}
        <span
          className="relative w-1.5 h-1.5"
          style={{ backgroundColor: c.color, boxShadow: `0 0 5px ${c.glow}` }}
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
