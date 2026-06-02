import { useState } from 'react';
import type { Container } from '../types';
import { MOCK_CONTAINERS } from '../constants/mockContainers';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface UseContainersReturn {
  containers: Container[];
  transitioning: Set<string>;
  startContainer: (id: string) => Promise<void>;
  stopContainer: (id: string) => Promise<void>;
  restartContainer: (id: string) => Promise<void>;
}

export function useContainers(): UseContainersReturn {
  const [containers, setContainers] = useState<Container[]>(MOCK_CONTAINERS);
  const [transitioning, setTransitioning] = useState<Set<string>>(new Set());

  function addTransition(id: string) {
    setTransitioning((prev) => new Set(prev).add(id));
  }

  function removeTransition(id: string) {
    setTransitioning((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function updateStatus(id: string, status: Container['status'], cpuReset = false) {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status, cpu: cpuReset ? 0 : c.cpu, memory: cpuReset ? 0 : c.memory }
          : c
      )
    );
  }

  // TODO: Replace with Portainer API call:
  // POST https://<portainer>/api/endpoints/1/docker/containers/{id}/start
  // Headers: { 'X-API-Key': '<token>' }
  async function startContainer(id: string) {
    addTransition(id);
    await delay(800);
    updateStatus(id, 'running');
    removeTransition(id);
  }

  // TODO: Replace with Portainer API call:
  // POST https://<portainer>/api/endpoints/1/docker/containers/{id}/stop
  async function stopContainer(id: string) {
    addTransition(id);
    await delay(800);
    updateStatus(id, 'exited', true);
    removeTransition(id);
  }

  // TODO: Replace with Portainer API call:
  // POST https://<portainer>/api/endpoints/1/docker/containers/{id}/restart
  async function restartContainer(id: string) {
    addTransition(id);
    await delay(1200);
    updateStatus(id, 'running');
    removeTransition(id);
  }

  return { containers, transitioning, startContainer, stopContainer, restartContainer };
}
