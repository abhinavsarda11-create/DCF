import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useGoldenBurst } from './GoldenSparkles';

interface ParentingJourneySectionProps {
  onOpenDetails: () => void;
  onOpenPledge?: () => void;
}

export function ParentingJourneySection({ onOpenDetails, onOpenPledge }: ParentingJourneySectionProps) {
  const { triggerGoldenBurst } = useGoldenBurst();

  const handleKnowMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 32);
    onOpenDetails();
  };

  const handlePledgeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 32);
    onOpenPledge?.();
  };

  return (
    <section id="who-we-are" className="py-16 sm:py-24 bg-[#fbf8f3] dark:bg-stone-950 transition-colors duration-200 overflow-hidden scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Image with Clean Zoom-In Effect on Hover Only */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative group max-w-lg w-full overflow-hidden rounded-2xl shadow-xl border border-[#ebdcc9] dark:border-stone-800 bg-[#f5efe4] dark:bg-stone-900 cursor-pointer">
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&w=1200&q=80"
                alt="Children at Dawn Child Foundation"
                className="w-full h-auto object-cover grayscale contrast-125 select-none transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Right Column: Heading, Narrative & Interactive Know More Button */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#ea580c] dark:text-[#ff7849] tracking-tight leading-tight mb-6"
            >
              Navigating the Parenting Journey
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed mb-8"
            >
              Parenting is beautiful but challenging. Dawn Child Foundation empowers parents and caregivers through self-awareness, storytelling, non-violent communication, and community support — helping families create nurturing home environments and emotionally safe childhoods where children can thrive.
            </motion.p>

            <div className="flex flex-wrap items-center gap-3.5">
              <motion.button
                onClick={handleKnowMore}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.35), 0 0 15px 2px rgba(251, 191, 36, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f25c27] to-[#e04515] text-white font-semibold text-sm tracking-wide shadow-md ring-1 ring-amber-300/40 transition-all cursor-pointer"
              >
                <span className="relative z-10">Know More</span>
              </motion.button>

              {onOpenPledge && (
                <motion.button
                  onClick={handlePledgeClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="px-6 py-3 rounded-full border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50/80 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-sm tracking-wide shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Take Pledge</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
