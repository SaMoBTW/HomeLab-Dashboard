export interface ContainerPort {
  private: number;
  public: number;
  protocol: 'tcp' | 'udp';
}

export interface Container {
  id: string;
  name: string;
  image: string;
  tag: string;
  status: 'running' | 'paused' | 'exited';
  cpu: number;
  memory: number;
  memoryLimit: number;
  uptime: string;
  ports: ContainerPort[];
}

export interface ServiceLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  category: 'media' | 'network' | 'management' | 'virtualization' | 'monitoring' | 'storage' | 'automation';
  status: 'online' | 'offline';
  description?: string;
}

export interface WidgetOrder {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  dismissed: boolean;
}

export type NavMode = 'routes' | 'tabs' | 'scroll';

export type TabId = 'dashboard' | 'containers' | 'analytics' | 'terminal';

export interface MetricPoint {
  time: string;
  value: number;
}

export interface NetworkPoint {
  time: string;
  inbound: number;
  outbound: number;
}

export interface SystemMetrics {
  cpu: { current: number; history: MetricPoint[] };
  ram: { used: number; total: number; percent: number; history: MetricPoint[] };
  network: { inbound: number; outbound: number; history: NetworkPoint[] };
  temp: { current: number; history: MetricPoint[] };
  storage: { used: number; total: number; percent: number };
}

export interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  lines: string[];
  timestamp: Date;
}
