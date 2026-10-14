import React, { useEffect, useRef, useCallback } from 'react';

export interface ConfettiBurstOptions {
  originX?: number;
  originY?: number;
  count?: number;
  mode?: 'all' | 'bookmarks' | 'quiz' | 'article';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  size: number;
  color: string;
  shape: 'heart' | 'star' | 'sparkle' | 'strip' | 'dot' | 'emoji';
  emoji?: string;
  alpha: number;
  decay: number;
}

const Y2K_COLORS = [
  '#FF2A85', // Hot Pink
  '#FF1493', // Deep Pink
  '#FF69B4', // Bubblegum Pink
  '#FEF08A', // Pastel Butter Yellow
  '#FDE047', // Cyber Sunshine
  '#C084FC', // Lavender Dream
  '#A855F7', // Vivid Purple
  '#38BDF8', // Frost Blue
  '#F472B6', // Rose
  '#FFFFFF', // Starlight White
];

const BOOKMARK_EMOJIS = ['💖', '💕', '⭐', '✨', '🎀', '💋'];
const QUIZ_EMOJIS = ['👑', '⭐', '💖', '✨', '💄', '🎀', '🦄', '🍓'];
const DEFAULT_EMOJIS = ['💖', '⭐', '✨', '🎀', '💋', '🍓', '💅'];

/**
 * Dispatch helper to trigger visual Y2K confetti from anywhere in the app
 */
export const triggerY2KConfetti = (options?: ConfettiBurstOptions) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('y2k-confetti-burst', {
        detail: options || {},
      })
    );
  }
};

interface Y2KConfettiBurstProps {
  /**
   * Optional ref callback to trigger burst imperatively
   */
  triggerRef?: React.MutableRefObject<((options?: ConfettiBurstOptions) => void) | null>;
  /**
   * Optional callback when burst completes
   */
  onComplete?: () => void;
}

export const Y2KConfettiBurst: React.FC<Y2KConfettiBurstProps> = ({ triggerRef, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isActiveRef = useRef<boolean>(false);

  const spawnBurst = useCallback((options?: ConfettiBurstOptions) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const count = options?.count ?? (options?.mode === 'bookmarks' ? 55 : options?.mode === 'quiz' ? 110 : 90);
    const mode = options?.mode ?? 'all';
    const hasOrigin = options?.originX !== undefined && options?.originY !== undefined;

    const originX = options?.originX ?? width / 2;
    const originY = options?.originY ?? height / 2;

    const emojiPool =
      mode === 'bookmarks'
        ? BOOKMARK_EMOJIS
        : mode === 'quiz'
        ? QUIZ_EMOJIS
        : DEFAULT_EMOJIS;

    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      let startX: number;
      let startY: number;
      let angle: number;
      let speed: number;

      if (hasOrigin) {
        // Point burst radially outward from click location (e.g. Bookmark button)
        startX = originX + (Math.random() * 20 - 10);
        startY = originY + (Math.random() * 20 - 10);
        // Radially outward with a slight upward bias
        angle = Math.random() * Math.PI * 2;
        speed = Math.random() * 11 + 6;
      } else {
        // Bottom fountain cannons (Dual cannons from screen corners towards center)
        const fromLeft = i % 2 === 0;
        startX = fromLeft ? width * 0.15 + (Math.random() * 80 - 40) : width * 0.85 + (Math.random() * 80 - 40);
        startY = height + 10;
        angle = fromLeft
          ? -Math.PI / 2 + (Math.random() * 0.7 - 0.1)
          : -Math.PI / 2 - (Math.random() * 0.7 - 0.1);
        speed = Math.random() * 16 + 18;
      }

      const shapeType = Math.random();
      let shape: Particle['shape'] = 'strip';
      let emoji: string | undefined = undefined;

      // Heavy weighting towards cute hearts & stars for Y2K style
      if (shapeType < 0.35) {
        shape = 'heart';
      } else if (shapeType < 0.6) {
        shape = 'star';
      } else if (shapeType < 0.75) {
        shape = 'sparkle';
      } else if (shapeType < 0.9) {
        shape = 'emoji';
        emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];
      } else if (shapeType < 0.96) {
        shape = 'strip';
      } else {
        shape = 'dot';
      }

      newParticles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed + (Math.random() * 3 - 1.5),
        vy: Math.sin(angle) * speed + (hasOrigin ? -Math.random() * 5 : 0),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.16,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.12 + 0.05,
        size:
          shape === 'emoji'
            ? Math.random() * 10 + 20
            : shape === 'heart'
            ? Math.random() * 10 + 15
            : Math.random() * 8 + 12,
        color: Y2K_COLORS[Math.floor(Math.random() * Y2K_COLORS.length)],
        shape,
        emoji,
        alpha: 1,
        decay: hasOrigin ? Math.random() * 0.008 + 0.009 : Math.random() * 0.005 + 0.005,
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];

    if (!isActiveRef.current) {
      isActiveRef.current = true;
      runAnimationLoop();
    }
  }, []);

  // Listen to global custom event
  useEffect(() => {
    const handleCustomBurst = (e: Event) => {
      const detail = (e as CustomEvent<ConfettiBurstOptions>).detail;
      spawnBurst(detail);
    };

    window.addEventListener('y2k-confetti-burst', handleCustomBurst);
    return () => window.removeEventListener('y2k-confetti-burst', handleCustomBurst);
  }, [spawnBurst]);

  // Expose trigger ref
  useEffect(() => {
    if (triggerRef) {
      triggerRef.current = spawnBurst;
    }
  }, [triggerRef, spawnBurst]);

  const runAnimationLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isActiveRef.current = false;
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      isActiveRef.current = false;
      return;
    }

    const gravity = 0.38;
    const drag = 0.984;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const activeParticles: Particle[] = [];

    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];

      // Physics
      p.vx *= drag;
      p.vy *= drag;
      p.vy += gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.wobble += p.wobbleSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > height + 60) {
        continue;
      }

      activeParticles.push(p);

      const currentAlpha = Math.max(0, Math.min(1, p.alpha));
      const wobbleWidth = p.size * Math.cos(p.wobble);

      // Render particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = currentAlpha;

      if (p.shape === 'heart') {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        const s = p.size * 0.72;
        ctx.moveTo(0, s * 0.35);
        ctx.bezierCurveTo(-s * 0.6, -s * 0.4, -s * 1.1, s * 0.3, 0, s * 1.1);
        ctx.bezierCurveTo(s * 1.1, s * 0.3, s * 0.6, -s * 0.4, 0, s * 0.35);
        ctx.closePath();
        ctx.fill();
      } else if (p.shape === 'star') {
        ctx.fillStyle = p.color;
        const outer = p.size * 0.75;
        const inner = outer * 0.44;
        ctx.beginPath();
        let rot = (Math.PI / 2) * 3;
        const step = Math.PI / 5;
        ctx.moveTo(0, -outer);
        for (let s = 0; s < 5; s++) {
          ctx.lineTo(Math.cos(rot) * outer, Math.sin(rot) * outer);
          rot += step;
          ctx.lineTo(Math.cos(rot) * inner, Math.sin(rot) * inner);
          rot += step;
        }
        ctx.closePath();
        ctx.fill();
      } else if (p.shape === 'sparkle') {
        ctx.fillStyle = p.color;
        const s = p.size * 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.closePath();
        ctx.fill();
      } else if (p.shape === 'emoji' && p.emoji) {
        ctx.font = `${Math.round(p.size)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
      } else if (p.shape === 'strip') {
        ctx.fillStyle = p.color;
        ctx.fillRect(-Math.abs(wobbleWidth) / 2, -p.size / 2, Math.abs(wobbleWidth), p.size);
      } else {
        // Dot
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    particlesRef.current = activeParticles;

    if (activeParticles.length > 0) {
      animFrameRef.current = requestAnimationFrame(runAnimationLoop);
    } else {
      ctx.clearRect(0, 0, width, height);
      isActiveRef.current = false;
      if (onComplete) onComplete();
    }
  };

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
