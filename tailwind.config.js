/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hud: {
          // Backgrounds — sandstone palette
          deep:    '#dddbd6',
          base:    '#ebe9e4',
          raised:  '#ffffff',
          overlay: '#0a0a0a',
          // Borders — pure black lines
          border:  '#000000',
          bright:  '#222222',
          // Accent system — crimson red
          accent:  '#ff1b00',
          'accent-dim': 'rgba(255,27,0,0.08)',
          'accent-glow': 'rgba(255,27,0,0.15)',
          // Status palette
          amber:   '#e8b34b',
          blue:    '#4d9fff',
          red:     '#ff1b00',
          // Text
          'text-1': '#000000',
          'text-2': '#4a4a46',
          'text-3': '#b5afa6',
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
