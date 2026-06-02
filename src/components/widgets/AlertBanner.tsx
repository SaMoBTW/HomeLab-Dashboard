import { X, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import type { SystemAlert } from '../../types';

interface AlertBannerProps {
  alert: SystemAlert;
  onDismiss: (id: string) => void;
}

const CFG = {
  warning: { icon: <AlertTriangle size={13} />, color: '#e8b34b', bg: 'rgba(232,179,75,0.05)' },
  error:   { icon: <AlertCircle size={13} />,   color: '#ff1b00', bg: 'rgba(255,27,0,0.05)' },
  info:    { icon: <Info size={13} />,           color: '#4d9fff', bg: 'rgba(77,159,255,0.05)' },
};

export function AlertBanner({ alert, onDismiss }: AlertBannerProps) {
  const c = CFG[alert.type];
  return (
    <div
      className="flex items-center gap-3 px-3 py-2 text-sm animate-fade-in border border-hud-border"
      style={{ backgroundColor: c.bg, borderLeft: `3px solid ${c.color}` }}
    >
      <span style={{ color: c.color }}>{c.icon}</span>
      <span className="flex-1 font-mono text-xs text-hud-text-2 truncate">{alert.message}</span>
      <span className="font-mono text-[10px] text-hud-text-3 shrink-0">
        {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
      <button
        onClick={() => onDismiss(alert.id)}
        className="shrink-0 text-hud-text-3 hover:text-hud-text-1 transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  );
}
