import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angleSpeed: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  rotation: number;
  rotSpeed: number;
  type: 'heart' | 'sparkle' | 'glitter' | 'star';
  color: string;
}

const PALETTE = [
  '#FF2A85', // Hot Pink
  '#FF69B4', // Bubblegum Pink
  '#C084FC', // Pastel Lavender
  '#F472B6', // Rose Pink
  '#FDE047', // Fairy Gold
  '#67E8F9', // Y2K Cyan Glaze
  '#FDA4AF', // Strawberry Peach
];

export const Y2KGlitterParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsEnabled(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 32 gentle ambient floating particles
    const particleCount = Math.min(36, Math.floor((width * height) / 32000));
    const types: Particle['type'][] = ['heart', 'sparkle', 'glitter', 'star'];

    const createParticle = (initialY?: number): Particle => {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        size: type === 'heart' ? 9 + Math.random() * 8 : 6 + Math.random() * 8,
        speedY: 0.35 + Math.random() * 0.65,
        speedX: 0.2 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: 0.015 + Math.random() * 0.02,
        opacity: 0.1 + Math.random() * 0.4,
        maxOpacity: 0.4 + Math.random() * 0.4,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        type,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
    };

    particlesRef.current = Array.from({ length: particleCount }, () => createParticle());

    // Helper: draw 4-pointed Y2K sparkle star
    const drawSparkle = (x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      ctx.beginPath();
      // Outer 4 diamond spikes
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.22),
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (size * 0.22)
        );
      }
      ctx.closePath();
      ctx.fill();

      // Bright center glint
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Helper: draw cute Y2K heart
    const drawHeart = (x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot * 0.5);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = '#FF2A85';
      ctx.shadowBlur = 5;

      const s = size * 0.55;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.4, 0, s * 1.3);
      ctx.bezierCurveTo(s * 1.2, s * 0.4, s, -s * 0.5, 0, s * 0.3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Helper: draw shimmering glitter diamond
    const drawGlitter = (x: number, y: number, size: number, color: string, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(size * 0.4, 0);
      ctx.lineTo(0, size * 0.7);
      ctx.lineTo(-size * 0.4, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Click to spawn a gentle burst of 5 micro sparkles
    const handleWindowClick = (e: MouseEvent) => {
      // Don't burst if clicking directly on forms or buttons
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('input') || target.closest('textarea')) return;

      const clickX = e.clientX;
      const clickY = e.clientY;

      for (let i = 0; i < 5; i++) {
        const p = createParticle(clickY + (Math.random() - 0.5) * 20);
        p.x = clickX + (Math.random() - 0.5) * 30;
        p.speedY = 0.8 + Math.random() * 1.2;
        p.opacity = 0.7;
        particlesRef.current.push(p);
      }
      // Cap at 50 particles max
      if (particlesRef.current.length > 50) {
        particlesRef.current.splice(0, particlesRef.current.length - 50);
      }
    };
    window.addEventListener('click', handleWindowClick);

    // Animation Loop
    let lastTime = performance.now();
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth sinusoidal drift
        p.angle += p.angleSpeed;
        p.x += Math.sin(p.angle) * p.speedX * (60 * dt);
        p.y -= p.speedY * (60 * dt);
        p.rotation += p.rotSpeed;

        // Gentle breathing pulse
        p.opacity = p.maxOpacity * (0.6 + 0.4 * Math.sin(time * 0.002 * (1 + p.pulseSpeed * 10)));

        // Draw particle based on type
        if (p.type === 'sparkle' || p.type === 'star') {
          drawSparkle(p.x, p.y, p.size, p.color, Math.max(0.1, p.opacity), p.rotation);
        } else if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, Math.max(0.12, p.opacity), p.rotation);
        } else {
          drawGlitter(p.x, p.y, p.size, p.color, Math.max(0.1, p.opacity), p.rotation);
        }

        // Reset to bottom if drifted off top or sides
        if (p.y < -30) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleWindowClick);
    };
  }, [isEnabled]);

  return (
    <>
      {/* Non-intrusive, pointer-events-none floating particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-20 select-none overflow-hidden"
        style={{ opacity: isEnabled ? 0.75 : 0 }}
        aria-hidden="true"
      />

      {/* Tiny subtle aesthetic sparkle toggle button in bottom left */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-sticker-sm backdrop-blur-xs transition-all cursor-pointer ${
            isEnabled
              ? 'bg-white/80 hover:bg-white text-[#FF2A85] border-pink-300'
              : 'bg-white/40 hover:bg-white/70 text-stone-500 border-stone-300'
          }`}
          title={isEnabled ? 'Click to pause floating glitter & hearts' : 'Click to enable floating glitter & hearts'}
        >
          <Sparkles className={`w-3 h-3 ${isEnabled ? 'text-yellow-400 fill-current animate-spin' : ''}`} />
          <span>{isEnabled ? 'Glitter ✨' : 'Glitter Off'}</span>
        </button>
      </div>
    </>
  );
};
