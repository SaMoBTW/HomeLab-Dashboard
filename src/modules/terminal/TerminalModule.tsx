import { Terminal as TerminalIcon, Trash2, Wifi } from 'lucide-react';
import { useTerminal } from '../../hooks/useTerminal';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';

export function TerminalModule() {
  const { history, commandHistory, historyIndex, setHistoryIndex, executeCommand } = useTerminal();

  return (
    <div className="p-4 h-full flex flex-col min-h-[500px]">
      <div className="flex flex-col flex-1 overflow-hidden hud-card">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-hud-border bg-hud-overlay shrink-0">
          <div className="flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5" style={{ backgroundColor: '#ff4757', boxShadow: '0 0 4px rgba(255,71,87,0.5)' }} />
              <span className="w-2.5 h-2.5" style={{ backgroundColor: '#e8b34b', boxShadow: '0 0 4px rgba(232,179,75,0.5)' }} />
              <span className="w-2.5 h-2.5" style={{ backgroundColor: '#00d4aa', boxShadow: '0 0 4px rgba(0,212,170,0.5)' }} />
            </div>
            <div className="w-px h-4 bg-hud-border" />
            <div className="flex items-center gap-1.5">
              <TerminalIcon size={11} className="text-hud-text-3" />
              <span className="font-mono text-[10px] text-hud-text-3 tracking-wider">homelab — bash — 80×24</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Wifi size={10} className="text-hud-accent" />
              <span className="font-mono text-[9px] text-hud-text-3 tracking-wider">CONNECTED</span>
            </div>
            <button
              onClick={() => executeCommand('clear')}
              title="Clear"
              className="text-hud-text-3 hover:text-hud-text-2 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Accent line */}
        <div className="h-0.5 bg-hud-accent/20 shrink-0" />

        <TerminalOutput history={history} />
        <TerminalInput
          onExecute={executeCommand}
          commandHistory={commandHistory}
          historyIndex={historyIndex}
          onHistoryIndexChange={setHistoryIndex}
        />
      </div>
    </div>
  );
}
