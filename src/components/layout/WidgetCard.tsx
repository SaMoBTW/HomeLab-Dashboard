import { GripVertical } from 'lucide-react';
import { useLayout } from '../../context/LayoutContext';
import type { ReactNode } from 'react';

interface WidgetCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  noPad?: boolean;
  accent?: boolean;
}

export function WidgetCard({ title, subtitle, children, className = '', noPad = false, accent = false }: WidgetCardProps) {
  const { isCustomizing } = useLayout();

  return (
    <div
      className={[
        'relative flex flex-col h-full hud-card transition-all duration-150',
        isCustomizing && 'border-hud-accent glow-accent',
        accent && 'hud-card-accent',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Customize drag handle */}
      {isCustomizing && (
        <div className="drag-handle absolute top-2 right-2 cursor-grab active:cursor-grabbing text-hud-text-3 hover:text-hud-text-2 transition-colors z-10">
          <GripVertical size={15} />
        </div>
      )}

      {/* Header */}
      {(title || subtitle) && (
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 shrink-0 border-b border-hud-border/60">
          {/* Accent dot */}
          <span className="w-1.5 h-1.5 bg-hud-accent shrink-0" />
          {title && (
            <span className="font-display font-semibold text-xs tracking-widest uppercase text-hud-text-2">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="font-mono text-[10px] text-hud-text-3 ml-auto">{subtitle}</span>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`flex-1 min-h-0 ${noPad ? '' : 'p-4'}`}>
        {children}
      </div>
    </div>
  );
}
