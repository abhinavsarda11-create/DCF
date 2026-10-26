import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Sun, CheckCircle2 } from 'lucide-react';
import { useGoldenBurst } from './GoldenSparkles';

interface TransformActionBannerProps {
  onJoinUs: () => void;
  onOpenPledge?: () => void;
}

export function TransformActionBanner({ onJoinUs, onOpenPledge }: TransformActionBannerProps) {
  const { triggerGoldenBurst } = useGoldenBurst();

  const handleJoinClick = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 36);
    onJoinUs();
  };

  const handlePledgeClick = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 36);
    onOpenPledge?.();
  };

  return (
    <section
      id="what-we-do"
      className="relative w-full bg-gradient-to-r from-[#c2410c] via-[#ea580c] via-[#f59e0b] via-[#ea580c] to-[#c2410c] py-20 sm:py-28 text-white overflow-hidden shadow-inner border-y border-amber-300/25"
    >
      {/* Eye-engaging Golden Sunlight Radiance Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,224,71,0.38),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_120%,rgba(245,158,11,0.35),rgba(255,255,255,0))] pointer-events-none" />

      {/* Moving Golden Sunbeam Sheen across the orange canvas */}
      <motion.div
        animate={{
          x: ['-100%', '150%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: 'easeInOut',
          repeatDelay: 1.5,
        }}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-amber-200/25 via-yellow-300/30 to-transparent skew-x-[-20deg] pointer-events-none"
      />

      {/* Floating Golden Light Dust Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.6, 0.35],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-radial from-amber-300/40 via-yellow-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.55, 0.3],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-radial from-amber-200/35 via-orange-400/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
        {/* Luminous Golden-Orange Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/15 backdrop-blur-md border border-amber-300/50 text-amber-100 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(251,191,36,0.35)]"
        >
          <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
          <span>Dawn Child Foundation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight mb-5 select-none drop-shadow-md text-white"
        >
          Transforming Lives Through Compassionate Action
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-white/95 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 drop-shadow-sm font-normal"
        >
          At the Dawn Child Foundation, we are dedicated to making a meaningful impact in the lives of children in need. Join us in our mission to create a brighter future through support, education, and community engagement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={handleJoinClick}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 20px 35px -10px rgba(0,0,0,0.3), 0 0 30px 4px rgba(251, 191, 36, 0.65)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group relative overflow-hidden px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white text-[#d84315] font-extrabold text-sm sm:text-base tracking-wide shadow-2xl cursor-pointer inline-flex items-center gap-2.5 ring-2 ring-amber-300/80"
          >
            {/* Golden Sheen sweep animation on button */}
            <motion.div
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-amber-200/60 to-transparent skew-x-12 pointer-events-none"
            />
            <span className="relative z-10 font-extrabold">Join Us Today</span>
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-4 h-4 text-[#ea580c] stroke-[2.5]" />
            </motion.div>
          </motion.button>

          {onOpenPledge && (
            <motion.button
              onClick={handlePledgeClick}
              whileHover={{
                scale: 1.06,
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative overflow-hidden px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl cursor-pointer inline-flex items-center gap-2 ring-2 ring-emerald-300/70"
            >
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Take Parent Pledge</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
