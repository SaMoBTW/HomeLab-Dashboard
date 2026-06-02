/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hud: {
          // Backgrounds — three distinct depths
          deep:    '#060a0f',
          base:    '#090e17',
          raised:  '#0d1520',
          overlay: '#121d2e',
          // Borders
          border:  '#1a2840',
          bright:  '#203354',
          // Accent system — single primary teal-green
          accent:  '#00d4aa',
          'accent-dim': 'rgba(0,212,170,0.12)',
          'accent-glow': 'rgba(0,212,170,0.35)',
          // Status palette
          amber:   '#e8b34b',
          blue:    '#4d9fff',
          red:     '#ff4757',
          // Text
          'text-1': '#dde6f0',
          'text-2': '#7a8fa6',
          'text-3': '#3a4f66',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'system-ui', 'sans-serif'],
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
