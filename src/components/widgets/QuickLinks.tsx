import { ServiceLinkCard } from './ServiceLinkCard';
import { MOCK_SERVICE_LINKS } from '../../constants/mockServiceLinks';

export function QuickLinks() {
  const online = MOCK_SERVICE_LINKS.filter((s) => s.status === 'online').length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="label">Services</span>
        <div className="flex-1 h-px bg-hud-border" />
        <span className="font-mono text-[10px] text-hud-text-3">
          <span style={{ color: '#00d4aa' }}>{online}</span>/{MOCK_SERVICE_LINKS.length}{' '}
          <span className="text-hud-text-3">ONLINE</span>
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {MOCK_SERVICE_LINKS.map((service) => (
          <ServiceLinkCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
