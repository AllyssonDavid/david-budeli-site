"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  color: string;
}

const PARTICLE_COUNT = 90;
const CONNECTION_DISTANCE = 120;
const MOBILE_PARTICLE_COUNT = 26;
const MOBILE_CONNECTION_DISTANCE = 86;

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let particleCount = PARTICLE_COUNT;
    let connectionDistance = CONNECTION_DISTANCE;

    const resize = () => {
      const viewportWidth = Math.round(
        window.visualViewport?.width ||
          document.documentElement.clientWidth ||
          window.innerWidth
      );
      const isMobile = viewportWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.75);
      W = viewportWidth;
      H = window.innerHeight;
      particleCount = isMobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
      connectionDistance = isMobile
        ? MOBILE_CONNECTION_DISTANCE
        : CONNECTION_DISTANCE;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particlesRef.current.length) init();
    };

    const createParticle = (): Particle => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.3,
      opacity: Math.random() * 0.35 + 0.05,
      color: Math.random() > 0.6 ? "59,130,246" : "139,92,246",
    });

    const init = () => {
      particlesRef.current = Array.from(
        { length: particleCount },
        createParticle
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const particles = particlesRef.current;

      // Update & draw dots
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = 0.06 * (1 - dist / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize, {
      passive: true,
    });
    return () => {
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
