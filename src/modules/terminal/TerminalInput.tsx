import { useState, useRef, useEffect, type KeyboardEvent } from 'react';

interface TerminalInputProps {
  onExecute: (cmd: string) => void;
  commandHistory: string[];
  historyIndex: number;
  onHistoryIndexChange: (i: number) => void;
}

export function TerminalInput({ onExecute, commandHistory, historyIndex, onHistoryIndexChange }: TerminalInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onExecute(value);
      setValue('');
      onHistoryIndexChange(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      onHistoryIndexChange(next);
      setValue(commandHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) { onHistoryIndexChange(-1); setValue(''); }
      else { onHistoryIndexChange(next); setValue(commandHistory[next] ?? ''); }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      onExecute('clear');
      setValue('');
    }
  }

  return (
    <div
      className="flex items-center gap-1 px-4 py-3 border-t border-hud-border shrink-0"
      style={{ background: '#0a0a0a', fontFamily: 'JetBrains Mono, ui-monospace, monospace', fontSize: '12px' }}
      onClick={() => inputRef.current?.focus()}
    >
      <span style={{ color: '#ff1b00', userSelect: 'none', whiteSpace: 'nowrap' }}>ourolabs@origin:~$</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none min-w-0"
        style={{ color: '#e4e3e0', caretColor: '#ff1b00' }}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
      />
    </div>
  );
}
