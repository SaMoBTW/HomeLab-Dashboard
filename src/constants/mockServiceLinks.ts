import type { ServiceLink } from '../types';

// TODO: These URLs should come from user configuration (env vars or a settings API).
// Replace hardcoded IPs with your actual homelab addresses.

export const MOCK_SERVICE_LINKS: ServiceLink[] = [
  {
    id: 'plex',
    name: 'Plex',
    url: 'http://192.168.1.100:32400/web',
    icon: 'Monitor',
    category: 'media',
    status: 'online',
    description: 'Media server',
  },
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    url: 'http://192.168.1.100:8096',
    icon: 'Tv',
    category: 'media',
    status: 'online',
    description: 'Open source media',
  },
  {
    id: 'overseerr',
    name: 'Overseerr',
    url: 'http://192.168.1.100:5055',
    icon: 'Film',
    category: 'media',
    status: 'online',
    description: 'Media requests',
  },
  {
    id: 'pihole',
    name: 'Pi-hole',
    url: 'http://192.168.1.1/admin',
    icon: 'Shield',
    category: 'network',
    status: 'online',
    description: 'DNS ad blocker',
  },
  {
    id: 'portainer',
    name: 'Portainer',
    url: 'http://192.168.1.100:9000',
    icon: 'Container',
    category: 'management',
    status: 'online',
    description: 'Docker management',
  },
  {
    id: 'proxmox',
    name: 'Proxmox',
    url: 'https://192.168.1.50:8006',
    icon: 'Server',
    category: 'virtualization',
    status: 'online',
    description: 'VM hypervisor',
  },
  {
    id: 'grafana',
    name: 'Grafana',
    url: 'http://192.168.1.100:3000',
    icon: 'BarChart2',
    category: 'monitoring',
    status: 'online',
    description: 'Metrics & dashboards',
  },
  {
    id: 'nginx-pm',
    name: 'Nginx PM',
    url: 'http://192.168.1.100:81',
    icon: 'Globe',
    category: 'network',
    status: 'offline',
    description: 'Reverse proxy',
  },
];
