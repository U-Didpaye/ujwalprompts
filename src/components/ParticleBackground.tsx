import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  theme: 'obsidian' | 'deep-plum';
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  isSilhouette: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle high DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Generate abstract AI head / mind silhouette particles + floating ambient nodes
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 9000), 220);

    // Center offset for the silhouette (slightly off-center right on wide screens)
    const centerX = width > 768 ? width * 0.72 : width * 0.5;
    const centerY = height * 0.45;
    const scale = Math.min(width, height) * 0.28;

    // 1. Generate AI Head / Mind Contour Particles
    const silhouetteCount = Math.floor(particleCount * 0.6);
    for (let i = 0; i < silhouetteCount; i++) {
      let px = 0;
      let py = 0;

      const t = (i / silhouetteCount) * Math.PI * 2;
      
      // Parametric equations forming an aesthetic AI skull / brain dome silhouette
      if (i % 3 === 0) {
        // Skull contour
        const r = scale * (0.8 + 0.15 * Math.sin(t * 2));
        px = centerX + r * Math.cos(t) * 0.85;
        py = centerY + r * Math.sin(t) * 1.1;
      } else if (i % 3 === 1) {
        // Top brain lobes network
        const r = scale * (0.4 + 0.35 * Math.sin(t * 3));
        px = centerX + r * Math.cos(t);
        py = centerY - scale * 0.25 + r * Math.sin(t) * 0.7;
      } else {
        // Inner neural node cluster
        const r = scale * (0.2 + 0.25 * Math.cos(t * 4));
        px = centerX + r * Math.cos(t) * 0.9;
        py = centerY + r * Math.sin(t) * 0.9;
      }

      // Add subtle random jitter so it looks organic
      px += (Math.random() - 0.5) * 16;
      py += (Math.random() - 0.5) * 16;

      particles.push({
        x: px,
        y: py,
        baseX: px,
        baseY: py,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.6 + 1.0,
        alpha: Math.random() * 0.35 + 0.2,
        phase: Math.random() * Math.PI * 2,
        isSilhouette: true
      });
    }

    // 2. Generate Floating Ambient Field Particles
    const ambientCount = particleCount - silhouetteCount;
    for (let i = 0; i < ambientCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      particles.push({
        x: px,
        y: py,
        baseX: px,
        baseY: py,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.4 + 0.8,
        alpha: Math.random() * 0.25 + 0.1,
        phase: Math.random() * Math.PI * 2,
        isSilhouette: false
      });
    }

    // Colors based on theme
    const getAccentRGB = () => {
      return theme === 'deep-plum'
        ? { r: 244, g: 184, b: 228 } // Soft Rose
        : { r: 199, g: 243, b: 107 }; // Electric Lime
    };

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += prefersReducedMotion ? 0.001 : 0.006;

      const accent = getAccentRGB();

      // Render connecting lines between close nodes
      const maxDistance = 75;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.12 * Math.min(particles[i].alpha, particles[j].alpha);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Render individual particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Slow organic breathing oscillation around base position
          const breathX = Math.sin(time + p.phase) * (p.isSilhouette ? 2.5 : 4);
          const breathY = Math.cos(time * 0.8 + p.phase) * (p.isSilhouette ? 2.5 : 4);

          p.x = p.baseX + breathX;
          p.y = p.baseY + breathY;

          // Gentle ambient drift for background nodes
          if (!p.isSilhouette) {
            p.baseX += p.vx;
            p.baseY += p.vy;

            // Wrap edges gently
            if (p.baseX < 0) p.baseX = width;
            if (p.baseX > width) p.baseX = 0;
            if (p.baseY < 0) p.baseY = height;
            if (p.baseY > height) p.baseY = 0;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Window resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
