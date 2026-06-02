import { useEffect, useRef } from 'react';
import { useMetrics } from '../../context/MetricsContext';

interface Particle {
  angle: number;
  distance: number;
  speedMultiplier: number;
  size: number;
  phase: number;
}

export function MetricTorus() {
  const { cpu, network } = useMetrics();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const metricsRef = useRef({ cpu: cpu.current, networkIn: network.inbound });

  // Update ref to avoid rebuilding render effect on every metric change
  useEffect(() => {
    metricsRef.current = { cpu: cpu.current, networkIn: network.inbound };
  }, [cpu, network]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 120;

    // Initialize particles in concentric tracks
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 85 + Math.random() * 30 + (i % 3) * 10,
        speedMultiplier: 0.5 + Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let globalRotation = 0;

    function render() {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Extract current metrics
      const currentCpu = metricsRef.current.cpu;
      const netActivity = metricsRef.current.networkIn;

      // Detect dark mode theme state dynamically in canvas context
      const isDark = document.documentElement.classList.contains('dark');

      // Calculate speed and colors based on live stats
      const baseSpeed = 0.003 + (currentCpu / 100) * 0.045;
      const dispersion = 2 + (currentCpu / 100) * 25;
      
      // Interpolate color from sandy-black (light) or sandstone (dark) to crimson red
      const redRatio = Math.min(currentCpu / 85, 1);
      let r: number, g: number, b: number;
      if (isDark) {
        // Sandstone beige (#dddbd6) to crimson (#ff1b00)
        r = Math.round(221 + (255 - 221) * redRatio);
        g = Math.round(219 - (219 - 27) * redRatio);
        b = Math.round(214 - 214 * redRatio);
      } else {
        // Sandy black (#4a4a46) to crimson (#ff1b00)
        r = Math.round(74 + (255 - 74) * redRatio);
        g = Math.round(74 - (74 - 27) * redRatio);
        b = Math.round(70 - 70 * redRatio);
      }
      const pColor = `rgb(${r}, ${g}, ${b})`;

      // Trail clear effect for fluid movement (match deep bg of the theme)
      ctx.fillStyle = isDark ? 'rgba(14, 13, 13, 0.22)' : 'rgba(221, 219, 214, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Draw engineering grid lines behind the torus
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.015)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw outer target circle
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${isDark ? 0.12 : 0.06})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 + Math.sin(globalRotation * 2) * 5, 0, Math.PI * 2);
      ctx.stroke();

      // Update and draw particles
      particles.forEach((p) => {
        // Particles wiggle more when CPU is high
        p.phase += 0.05 + (currentCpu / 100) * 0.1;
        const wiggle = Math.sin(p.phase) * dispersion;
        
        // Base orbit speed + personal multiplier
        p.angle += baseSpeed * p.speedMultiplier;

        const x = centerX + Math.cos(p.angle) * (p.distance + wiggle);
        const y = centerY + Math.sin(p.angle) * (p.distance + wiggle);

        // Draw particle dot
        ctx.fillStyle = pColor;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw secondary orbit ring representing network I/O
      globalRotation -= 0.008 + (netActivity / 80) * 0.03;
      ctx.strokeStyle = isDark
        ? `rgba(221, 219, 214, ${0.12 + (netActivity / 80) * 0.15})`
        : `rgba(0, 0, 0, ${0.08 + (netActivity / 80) * 0.15})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 135, globalRotation, globalRotation + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cpu, network]);

  // Dynamically compute display color in React render as well
  const isHot = cpu.current > 75;
  const isWarm = cpu.current > 50;
  const cpuTextColor = isHot ? 'text-hud-accent' : isWarm ? 'text-hud-amber' : 'text-hud-text-1';

  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center select-none">
      <canvas
        ref={canvasRef}
        width={340}
        height={340}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      {/* Center text metrics readout */}
      <div className="text-center z-10 flex flex-col items-center justify-center">
        <span className="font-mono text-[10px] text-hud-text-3 tracking-widest uppercase">system load</span>
        <span className={`font-mono text-4xl font-bold tracking-tighter ${cpuTextColor} leading-none mt-1.5`}>
          {cpu.current.toFixed(1)}<span className="text-sm font-medium">%</span>
        </span>
        <span className="font-display font-semibold text-[9px] text-hud-text-2 tracking-widest uppercase mt-2">
          cpu utilization
        </span>
      </div>
    </div>
  );
}
