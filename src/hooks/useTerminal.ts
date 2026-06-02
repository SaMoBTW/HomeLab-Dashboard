import { useState, useCallback } from 'react';
import type { TerminalEntry } from '../types';
import { MOCK_CONTAINERS } from '../constants/mockContainers';

function makeEntry(type: TerminalEntry['type'], lines: string[]): TerminalEntry {
  return { id: crypto.randomUUID(), type, lines, timestamp: new Date() };
}

const HELP_OUTPUT = [
  'Available commands:',
  '  help          Show this help message',
  '  clear         Clear the terminal',
  '  docker ps     List running containers',
  '  docker stats  Show container resource usage',
  '  uptime        Show system uptime',
  '  df -h         Show disk usage',
  '  ls            List files in current directory',
  '  pwd           Print working directory',
  '  whoami        Print current user',
  '  ping <host>   Ping a host',
  '',
  'Type any command to get started.',
];

function dockerPs(): string[] {
  const header = 'CONTAINER ID   NAME                     IMAGE                           STATUS    PORTS';
  const sep = '─'.repeat(90);
  const rows = MOCK_CONTAINERS.filter((c) => c.status === 'running').map((c) => {
    const id = c.id.slice(0, 12);
    const ports = c.ports.map((p) => `${p.public}/${p.protocol}`).join(', ') || '-';
    const name = c.name.padEnd(24).slice(0, 24);
    const image = `${c.image}:${c.tag}`.padEnd(35).slice(0, 35);
    return `${id}   ${name} ${image} Up        ${ports}`;
  });
  return [header, sep, ...rows];
}

function dockerStats(): string[] {
  const header = 'CONTAINER ID   NAME                     CPU %    MEM USAGE / LIMIT    MEM %';
  const sep = '─'.repeat(75);
  const rows = MOCK_CONTAINERS.filter((c) => c.status === 'running').map((c) => {
    const id = c.id.slice(0, 12);
    const name = c.name.padEnd(24).slice(0, 24);
    const cpu = `${c.cpu.toFixed(2)}%`.padStart(7);
    const memUsage = `${c.memory}MiB / ${c.memoryLimit}MiB`.padEnd(20);
    const memPct = `${((c.memory / c.memoryLimit) * 100).toFixed(1)}%`;
    return `${id}   ${name} ${cpu}    ${memUsage} ${memPct}`;
  });
  return [header, sep, ...rows];
}

function dfH(): string[] {
  return [
    'Filesystem       Size  Used Avail Use% Mounted on',
    '/dev/sda1         30G  8.2G   20G  30% /',
    '/dev/sdb1        8.0T  2.4T  5.6T  30% /mnt/data',
    'tmpfs            7.8G  132M  7.7G   2% /dev/shm',
    '/dev/sdc1        500G  180G  320G  36% /mnt/backup',
  ];
}

function uptimeOutput(): string[] {
  const now = new Date();
  const hours = Math.floor(Math.random() * 12) + 720;
  const days = Math.floor(hours / 24);
  const h = hours % 24;
  const load = [
    (Math.random() * 1.5).toFixed(2),
    (Math.random() * 1.2).toFixed(2),
    (Math.random() * 0.9).toFixed(2),
  ].join(', ');
  return [
    ` ${now.toLocaleTimeString()} up ${days} days, ${h}:${String(now.getMinutes()).padStart(2, '0')},  1 user,  load average: ${load}`,
  ];
}

interface UseTerminalReturn {
  history: TerminalEntry[];
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (i: number) => void;
  executeCommand: (cmd: string) => void;
}

export function useTerminal(): UseTerminalReturn {
  const [history, setHistory] = useState<TerminalEntry[]>([
    makeEntry('system', ['Homelab Command Center — Terminal v1.0', "Type 'help' for available commands."]),
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addEntries = useCallback((...entries: TerminalEntry[]) => {
    setHistory((prev) => [...prev, ...entries]);
  }, []);

  const executeCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;

      const inputEntry = makeEntry('input', [cmd]);
      setCommandHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);

      if (cmd === 'clear') {
        setHistory([makeEntry('system', ["Terminal cleared. Type 'help' for commands."])]);
        return;
      }

      if (cmd === 'help') {
        addEntries(inputEntry, makeEntry('output', HELP_OUTPUT));
        return;
      }

      if (cmd === 'docker ps') {
        addEntries(inputEntry, makeEntry('output', dockerPs()));
        return;
      }

      if (cmd === 'docker stats') {
        addEntries(inputEntry, makeEntry('output', dockerStats()));
        return;
      }

      if (cmd === 'uptime') {
        addEntries(inputEntry, makeEntry('output', uptimeOutput()));
        return;
      }

      if (cmd === 'df -h') {
        addEntries(inputEntry, makeEntry('output', dfH()));
        return;
      }

      if (cmd === 'ls') {
        addEntries(inputEntry, makeEntry('output', ['docker-compose.yml  config/  data/  logs/  backups/']));
        return;
      }

      if (cmd === 'pwd') {
        addEntries(inputEntry, makeEntry('output', ['/home/homelab-admin']));
        return;
      }

      if (cmd === 'whoami') {
        addEntries(inputEntry, makeEntry('output', ['homelab-admin']));
        return;
      }

      if (cmd.startsWith('ping ')) {
        const host = cmd.slice(5).trim() || '127.0.0.1';
        addEntries(inputEntry);
        // Simulate progressive ping output
        const pingLines = [
          `PING ${host}: 56 data bytes`,
          `64 bytes from ${host}: icmp_seq=0 ttl=64 time=${(Math.random() * 3 + 0.5).toFixed(3)} ms`,
          `64 bytes from ${host}: icmp_seq=1 ttl=64 time=${(Math.random() * 3 + 0.5).toFixed(3)} ms`,
          `64 bytes from ${host}: icmp_seq=2 ttl=64 time=${(Math.random() * 3 + 0.5).toFixed(3)} ms`,
          `64 bytes from ${host}: icmp_seq=3 ttl=64 time=${(Math.random() * 3 + 0.5).toFixed(3)} ms`,
          '',
          `--- ${host} ping statistics ---`,
          `4 packets transmitted, 4 packets received, 0.0% packet loss`,
        ];
        let i = 0;
        const interval = setInterval(() => {
          setHistory((prev) => {
            const last = prev[prev.length - 1];
            if (last?.type === 'output' && last.lines[0]?.startsWith('PING')) {
              return [
                ...prev.slice(0, -1),
                { ...last, lines: [...last.lines, pingLines[i]] },
              ];
            }
            return [...prev, makeEntry('output', [pingLines[i]])];
          });
          i++;
          if (i >= pingLines.length) clearInterval(interval);
        }, 200);
        return;
      }

      addEntries(
        inputEntry,
        makeEntry('error', [`bash: ${cmd.split(' ')[0]}: command not found`])
      );
    },
    [addEntries]
  );

  return { history, commandHistory, historyIndex, setHistoryIndex, executeCommand };
}
