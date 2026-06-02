import { useEffect, useRef } from 'react';
import type { TerminalEntry } from '../../types';

const LINE_COLORS: Record<TerminalEntry['type'], string> = {
  input:  '#e4e3e0',
  output: '#b5afa6',
  error:  '#ff1b00',
  system: '#ff1b00',
};

export function TerminalOutput({ history }: { history: TerminalEntry[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4 min-h-0"
      style={{
        background: '#0a0a0a',
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: '12px',
        lineHeight: '1.7',
      }}
    >
      {history.map((entry) => (
        <div key={entry.id} className="animate-fade-in">
          {entry.type === 'input' ? (
            <div className="flex gap-1 mb-1">
              <span style={{ color: '#ff1b00', userSelect: 'none' }}>ourolabs@origin:~$</span>
              <span style={{ color: '#e4e3e0' }}>{entry.lines[0]}</span>
            </div>
          ) : (
            entry.lines.map((line, i) => (
              <div key={i} style={{ color: LINE_COLORS[entry.type] }}>
                {line || ' '}
              </div>
            ))
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
