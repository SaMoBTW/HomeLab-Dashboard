import { Play, Square, RefreshCw } from 'lucide-react';
import { Tooltip } from '../../components/ui/Tooltip';
import { Button } from '../../components/ui/Button';
import type { Container } from '../../types';

interface ContainerActionsProps {
  container: Container;
  isTransitioning: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart: () => void;
}

export function ContainerActions({
  container,
  isTransitioning,
  onStart,
  onStop,
  onRestart,
}: ContainerActionsProps) {
  const canStart = container.status !== 'running';
  const canStop = container.status === 'running' || container.status === 'paused';

  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Start">
        <Button
          variant="success"
          size="icon"
          disabled={!canStart || isTransitioning}
          loading={isTransitioning && container.status === 'exited'}
          onClick={onStart}
        >
          <Play size={12} />
        </Button>
      </Tooltip>

      <Tooltip content="Stop">
        <Button
          variant="danger"
          size="icon"
          disabled={!canStop || isTransitioning}
          loading={isTransitioning && container.status === 'running'}
          onClick={onStop}
        >
          <Square size={12} />
        </Button>
      </Tooltip>

      <Tooltip content="Restart">
        <Button
          variant="warning"
          size="icon"
          disabled={container.status !== 'running' || isTransitioning}
          loading={isTransitioning && container.status === 'running'}
          onClick={onRestart}
        >
          <RefreshCw size={12} />
        </Button>
      </Tooltip>
    </div>
  );
}
