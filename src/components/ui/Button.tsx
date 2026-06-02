import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'icon';
  loading?: boolean;
  children: ReactNode;
}

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, { style: React.CSSProperties; base: string }> = {
  primary: { base: 'text-hud-deep font-semibold bg-hud-accent border border-hud-border', style: { boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' } },
  ghost:   { base: 'text-hud-text-2 hover:text-hud-text-1 border border-hud-border hover:bg-black/5', style: {} },
  danger:  { base: 'border font-medium', style: { color: '#ff1b00', borderColor: '#ff1b00', backgroundColor: 'rgba(255, 27, 0, 0.08)' } },
  success: { base: 'border font-medium', style: { color: '#000000', borderColor: '#000000', backgroundColor: 'rgba(0, 0, 0, 0.05)' } },
  warning: { base: 'border font-medium', style: { color: '#e8b34b', borderColor: '#e8b34b', backgroundColor: 'rgba(232, 179, 75, 0.08)' } },
};

const SIZES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm:   'px-2 py-1 text-xs',
  md:   'px-3 py-1.5 text-xs',
  icon: 'p-1.5',
};

export function Button({ variant = 'ghost', size = 'md', loading = false, disabled, children, className = '', style, ...props }: ButtonProps) {
  const v = VARIANTS[variant];
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-1.5 font-mono font-medium tracking-wide transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${v.base} ${SIZES[size]} ${className}`}
      style={{ ...v.style, ...style }}
      {...props}
    >
      {loading
        ? <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        : children
      }
    </button>
  );
}
