import { useEffect, useRef } from 'react';
import type { TerminalEntry } from '../../types';

const LINE_COLORS: Record<TerminalEntry['type'], string> = {
  input:  '#00d4aa',
  output: '#7a8fa6',
  error:  '#ff4757',
  system: '#4d9fff',
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
        background: '#060a0f',
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: '12px',
        lineHeight: '1.7',
      }}
    >
      {history.map((entry) => (
        <div key={entry.id} className="animate-fade-in">
          {entry.type === 'input' ? (
            <div className="flex gap-1 mb-1">
              <span style={{ color: '#3a4f66', userSelect: 'none' }}>user@homelab:~$&nbsp;</span>
              <span style={{ color: '#00d4aa' }}>{entry.lines[0]}</span>
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
