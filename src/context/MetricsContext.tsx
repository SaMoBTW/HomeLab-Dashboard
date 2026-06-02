/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { SystemMetrics, MetricPoint, NetworkPoint } from '../types';

const HISTORY_SIZE = 30;

function formatTime(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function walk(prev: number, delta: number, min: number, max: number): number {
  return clamp(prev + (Math.random() - 0.5) * delta, min, max);
}

function buildInitialHistory<T>(
  count: number,
  factory: (i: number) => T
): T[] {
  return Array.from({ length: count }, (_, i) => factory(i));
}

function makeInitialMetrics(): SystemMetrics {
  const now = Date.now();
  return {
    cpu: {
      current: 35,
      history: buildInitialHistory(HISTORY_SIZE, (i) => ({
        time: new Date(now - (HISTORY_SIZE - i) * 2000).toLocaleTimeString('en-US', { hour12: false }),
        value: 30 + Math.random() * 20,
      })),
    },
    ram: {
      used: 5.8,
      total: 16,
      percent: 36,
      history: buildInitialHistory(HISTORY_SIZE, (i) => ({
        time: new Date(now - (HISTORY_SIZE - i) * 2000).toLocaleTimeString('en-US', { hour12: false }),
        value: 30 + Math.random() * 15,
      })),
    },
    network: {
      inbound: 12.4,
      outbound: 3.2,
      history: buildInitialHistory<NetworkPoint>(HISTORY_SIZE, (i) => ({
        time: new Date(now - (HISTORY_SIZE - i) * 2000).toLocaleTimeString('en-US', { hour12: false }),
        inbound: 8 + Math.random() * 10,
        outbound: 2 + Math.random() * 5,
      })),
    },
    temp: {
      current: 52,
      history: buildInitialHistory(HISTORY_SIZE, (i) => ({
        time: new Date(now - (HISTORY_SIZE - i) * 2000).toLocaleTimeString('en-US', { hour12: false }),
        value: 48 + Math.random() * 12,
      })),
    },
    storage: {
      used: 2.4,
      total: 8,
      percent: 30,
    },
  };
}

function appendHistory<T extends MetricPoint>(history: T[], next: T): T[] {
  return [...history.slice(-(HISTORY_SIZE - 1)), next];
}

const MetricsContext = createContext<SystemMetrics | null>(null);

export function MetricsProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<SystemMetrics>(makeInitialMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = formatTime();

      setMetrics((prev) => {
        const cpuVal = walk(prev.cpu.current, 12, 5, 95);
        const ramPct = walk(prev.ram.percent, 5, 15, 90);
        const ramUsed = parseFloat(((ramPct / 100) * prev.ram.total).toFixed(1));
        const inbound = walk(prev.network.inbound, 8, 0.5, 80);
        const outbound = walk(prev.network.outbound, 4, 0.1, 40);
        const tempVal = walk(prev.temp.current, 4, 38, 92);

        return {
          cpu: {
            current: cpuVal,
            history: appendHistory(prev.cpu.history, { time, value: cpuVal }),
          },
          ram: {
            used: ramUsed,
            total: prev.ram.total,
            percent: ramPct,
            history: appendHistory(prev.ram.history, { time, value: ramPct }),
          },
          network: {
            inbound,
            outbound,
            history: [...prev.network.history.slice(-(HISTORY_SIZE - 1)), { time, inbound, outbound }],
          },
          temp: {
            current: tempVal,
            history: appendHistory(prev.temp.history, { time, value: tempVal }),
          },
          storage: prev.storage,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <MetricsContext.Provider value={metrics}>{children}</MetricsContext.Provider>;
}

export function useMetrics(): SystemMetrics {
  const ctx = useContext(MetricsContext);
  if (!ctx) throw new Error('useMetrics must be used within MetricsProvider');
  return ctx;
}
