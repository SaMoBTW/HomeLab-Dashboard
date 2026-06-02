import {
  Monitor, Tv, Film, Shield, Container, Server, BarChart2, Globe,
  HardDrive, Home, Wifi, Database, ExternalLink, type LucideIcon,
} from 'lucide-react';
import type { ServiceLink } from '../../types';

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Tv, Film, Shield, Container, Server, BarChart2, Globe,
  HardDrive, Home, Wifi, Database,
};

const CATEGORY_COLOR: Record<ServiceLink['category'], string> = {
  media:          '#a855f7',
  network:        '#4d9fff',
  management:     '#e8b34b',
  virtualization: '#00d4aa',
  monitoring:     '#f97316',
  storage:        '#22d3ee',
  automation:     '#ec4899',
};

interface ServiceLinkCardProps {
  service: ServiceLink;
}

export function ServiceLinkCard({ service }: ServiceLinkCardProps) {
  const Icon = ICON_MAP[service.icon] ?? Server;
  const catColor = CATEGORY_COLOR[service.category] ?? '#7a8fa6';
  const isOnline = service.status === 'online';

  return (
    <a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative hud-card flex flex-col gap-3 p-4 transition-all duration-200 overflow-hidden"
      style={{
        '--card-accent': catColor,
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${catColor}40`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px -8px ${catColor}30`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
    >
      {/* Left accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-200"
        style={{
          backgroundColor: catColor,
          opacity: isOnline ? 0.6 : 0.2,
          boxShadow: isOnline ? `0 0 6px ${catColor}` : 'none',
        }}
      />

      {/* Offline overlay */}
      {!isOnline && <div className="absolute inset-0 bg-hud-deep/40" />}

      <div className="flex items-start justify-between relative">
        <div
          className="w-8 h-8 flex items-center justify-center"
          style={{ color: isOnline ? catColor : '#3a4f66' }}
        >
          <Icon size={18} />
        </div>
        {/* Status dot */}
        <span className="relative flex items-center justify-center w-2 h-2 mt-1">
          {isOnline && (
            <span
              className="absolute inset-0 animate-ping"
              style={{ backgroundColor: '#00d4aa', opacity: 0.4 }}
            />
          )}
          <span
            className="relative w-1.5 h-1.5"
            style={{
              backgroundColor: isOnline ? '#00d4aa' : '#3a4f66',
              boxShadow: isOnline ? '0 0 5px rgba(0,212,170,0.6)' : 'none',
            }}
          />
        </span>
      </div>

      <div className="min-w-0 relative">
        <p className="font-display font-semibold text-sm tracking-wide text-hud-text-1 group-hover:text-white transition-colors truncate">
          {service.name}
        </p>
        {service.description && (
          <p className="font-mono text-[10px] text-hud-text-3 truncate mt-0.5">{service.description}</p>
        )}
      </div>

      <div className="flex items-center justify-between relative">
        <span
          className="font-mono text-[9px] font-semibold tracking-widest uppercase px-1.5 py-0.5"
          style={{
            color: catColor,
            backgroundColor: `${catColor}15`,
          }}
        >
          {service.category}
        </span>
        <ExternalLink
          size={11}
          className="text-hud-text-3 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </a>
  );
}
