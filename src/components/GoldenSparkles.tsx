import { useState, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  shape: 'star' | 'circle' | 'sparkle';
  duration: number;
}

interface GoldenBurstEvent {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

interface GoldenContextType {
  triggerGoldenBurst: (x?: number, y?: number, count?: number) => void;
}

const GoldenContext = createContext<GoldenContextType>({
  triggerGoldenBurst: () => {},
});

export const useGoldenBurst = () => useContext(GoldenContext);

const GOLDEN_PALETTE = [
  '#ffd700', // Pure Gold
  '#f59e0b', // Amber Gold
  '#fbbf24', // Warm Gold
  '#fef08a', // Radiant Sunlight
  '#fef3c7', // Cream Glow
  '#f97316', // Orange Sunlight
];

export function GoldenProvider({ children }: { children: React.ReactNode }) {
  const [bursts, setBursts] = useState<GoldenBurstEvent[]>([]);

  const triggerGoldenBurst = useCallback((targetX?: number, targetY?: number, count = 28) => {
    // If coordinates not provided, default to screen center
    const x = targetX !== undefined ? targetX : window.innerWidth / 2;
    const y = targetY !== undefined ? targetY : window.innerHeight / 2;

    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 95 + 40;
      const shapes: ('star' | 'circle' | 'sparkle')[] = ['star', 'sparkle', 'circle'];

      return {
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 8 + 4,
        color: GOLDEN_PALETTE[Math.floor(Math.random() * GOLDEN_PALETTE.length)],
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        duration: Math.random() * 0.4 + 0.6,
      };
    });

    const burstId = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id: burstId, x, y, particles: newParticles }]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 1200);
  }, []);

  return (
    <GoldenContext.Provider value={{ triggerGoldenBurst }}>
      {children}

      {/* Global Golden Particle Burst Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        <AnimatePresence>
          {bursts.map((burst) => (
            <div
              key={burst.id}
              className="absolute pointer-events-none"
              style={{ left: burst.x, top: burst.y }}
            >
              {/* Expanding Golden Sunburst Ring */}
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.8)] pointer-events-none"
              />

              {/* Radiant Golden Glow Flash */}
              <motion.div
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-radial from-amber-300/60 via-yellow-400/30 to-transparent blur-md pointer-events-none"
              />

              {/* Individual Golden Sparkle Particles */}
              {burst.particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0.2,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: p.vx,
                    y: p.vy,
                    scale: [0.3, 1.4, 0],
                    opacity: [1, 1, 0],
                    rotate: p.rotation + 360,
                  }}
                  transition={{
                    duration: p.duration,
                    ease: 'easeOut',
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                  style={{ color: p.color }}
                >
                  {p.shape === 'star' ? (
                    <svg
                      width={p.size}
                      height={p.size}
                      viewBox="0 0 24 24"
                      fill={p.color}
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ) : p.shape === 'sparkle' ? (
                    <svg
                      width={p.size}
                      height={p.size}
                      viewBox="0 0 24 24"
                      fill={p.color}
                      stroke="none"
                    >
                      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                    </svg>
                  ) : (
                    <div
                      className="rounded-full shadow-xs"
                      style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </GoldenContext.Provider>
  );
}
