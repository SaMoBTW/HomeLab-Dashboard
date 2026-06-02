/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hud: {
          // Backgrounds — sandstone palette
          deep:    'var(--hud-deep)',
          base:    'var(--hud-base)',
          raised:  'var(--hud-raised)',
          overlay: 'var(--hud-overlay)',
          // Borders — pure black lines
          border:  'var(--hud-border)',
          bright:  'var(--hud-bright)',
          // Accent system — crimson red
          accent:  'var(--hud-accent)',
          'accent-dim': 'var(--hud-accent-dim)',
          'accent-glow': 'var(--hud-accent-glow)',
          // Status palette
          amber:   'var(--hud-amber)',
          blue:    'var(--hud-blue)',
          red:     'var(--hud-red)',
          // Text
          'text-1': 'var(--hud-text-1)',
          'text-2': 'var(--hud-text-2)',
          'text-3': 'var(--hud-text-3)',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-dot':  'pulseDot 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in':    'fadeIn 0.15s ease-out',
        'slide-up':   'slideUp 0.2s ease-out',
        'scan':       'scan 8s linear infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'accent':    '0 0 24px -4px rgba(0,212,170,0.4)',
        'accent-sm': '0 0 12px -4px rgba(0,212,170,0.35)',
        'amber':     '0 0 16px -4px rgba(232,179,75,0.4)',
        'red':       '0 0 16px -4px rgba(255,71,87,0.4)',
        'inset-t':   'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
};
