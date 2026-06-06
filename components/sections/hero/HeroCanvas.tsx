"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  speed: number;
}

interface GridLine {
  x: number;
  y: number;
  isHorizontal: boolean;
  opacity: number;
  pulseOffset: number;
  pulseSpeed: number;
}

const DESKTOP_PARTICLE_COUNT = 60;
const MOBILE_PARTICLE_COUNT = 34;
const DESKTOP_GRID_SPACING = 80;
const MOBILE_GRID_SPACING = 52;
const DESKTOP_CONNECTION_DIST = 130;
const MOBILE_CONNECTION_DIST = 92;

export function HeroCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let gridLines: GridLine[] = [];
    let gridSpacing = DESKTOP_GRID_SPACING;
    let connectionDist = DESKTOP_CONNECTION_DIST;
    let particleCount = DESKTOP_PARTICLE_COUNT;

    // --- Setup ---
    const resize = () => {
      const viewportWidth = Math.round(
        window.visualViewport?.width ||
          document.documentElement.clientWidth ||
          window.innerWidth
      );
      const isMobile = viewportWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      W = viewportWidth;
      H = window.innerHeight;
      gridSpacing = isMobile ? MOBILE_GRID_SPACING : DESKTOP_GRID_SPACING;
      connectionDist = isMobile
        ? MOBILE_CONNECTION_DIST
        : DESKTOP_CONNECTION_DIST;
      particleCount = isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      if (particles.length) initParticles();
    };

    const buildGrid = () => {
      gridLines = [];
      const cols = Math.ceil(W / gridSpacing) + 1;
      const rows = Math.ceil(H / gridSpacing) + 1;
      for (let i = 0; i < cols; i++) {
        gridLines.push({
          x: i * gridSpacing,
          y: 0,
          isHorizontal: false,
          opacity: 0.015 + Math.random() * 0.02,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 0.4,
        });
      }
      for (let j = 0; j < rows; j++) {
        gridLines.push({
          x: 0,
          y: j * gridSpacing,
          isHorizontal: true,
          opacity: 0.015 + Math.random() * 0.02,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.3 + Math.random() * 0.4,
        });
      }
    };

    const createParticle = (): Particle => {
      const maxLife = 200 + Math.random() * 300;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        life: Math.random() * maxLife,
        maxLife,
        size: 0.5 + Math.random() * 1.2,
        speed: 0.8 + Math.random() * 0.4,
      };
    };

    const initParticles = () => {
      particles = Array.from({ length: particleCount }, createParticle);
    };

    // --- Draw ---
    const drawGrid = (t: number) => {
      gridLines.forEach((gl) => {
        const pulse = Math.sin(t * gl.pulseSpeed + gl.pulseOffset) * 0.5 + 0.5;
        const alpha = gl.opacity * (0.6 + pulse * 0.4);

        // Mouse proximity brightening
        const mx = gl.isHorizontal ? mouseRef.current.x : gl.x;
        const my = gl.isHorizontal ? gl.y : mouseRef.current.y;
        const dist = Math.sqrt(
          (mx - mouseRef.current.x) ** 2 + (my - mouseRef.current.y) ** 2
        );
        const proximity = Math.max(0, 1 - dist / 200);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(59,130,246,${alpha + proximity * 0.06})`;
        ctx.lineWidth = 0.5;
        if (gl.isHorizontal) {
          ctx.moveTo(0, gl.y);
          ctx.lineTo(W, gl.y);
        } else {
          ctx.moveTo(gl.x, 0);
          ctx.lineTo(gl.x, H);
        }
        ctx.stroke();
      });
    };

    const drawParticles = () => {
      particles.forEach((p, i) => {
        // Lifecycle
        p.life += p.speed;
        if (p.life > p.maxLife) {
          particles[i] = createParticle();
          particles[i].life = 0;
          return;
        }

        // Fade in / out
        const t = p.life / p.maxLife;
        const alpha =
          t < 0.1
            ? t / 0.1
            : t > 0.85
            ? (1 - t) / 0.15
            : 1;

        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 120) {
          const force = (1 - dist / 120) * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;

        // Dot
        const col = i % 3 === 0 ? "139,92,246" : "59,130,246";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${alpha * 0.6})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawAtmosphericGlow = () => {
      // Center glow
      const cx = W * 0.5;
      const cy = H * 0.4;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.55);
      grad.addColorStop(0, "rgba(59,130,246,0.055)");
      grad.addColorStop(0.5, "rgba(139,92,246,0.02)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Mouse glow
      if (mouseRef.current.x > 0) {
        const mg = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          200
        );
        mg.addColorStop(0, "rgba(59,130,246,0.04)");
        mg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = mg;
        ctx.fillRect(0, 0, W, H);
      }
    };

    const draw = (timestamp: number) => {
      const t = timestamp * 0.001;
      timeRef.current = t;

      ctx.clearRect(0, 0, W, H);
      drawAtmosphericGlow();
      drawGrid(t);
      drawParticles();

      rafRef.current = requestAnimationFrame(draw);
    };

    // --- Mouse tracking ---
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    initParticles();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    window.visualViewport?.addEventListener("resize", resize, {
      passive: true,
    });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
