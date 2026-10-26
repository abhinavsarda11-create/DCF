import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export function CommunityStoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#fbf8f3] dark:bg-stone-950 transition-colors duration-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight select-none"
          >
            Heartfelt Stories from Our Community of Supporters
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto"
          >
            At the Dawn Child Foundation, we believe in the power of community. Here are inspiring stories from parents who have witnessed the positive impact of our initiatives.
          </motion.p>
        </div>

        {/* 2 Cards with Interactive Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Real Impact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)' }}
            className="p-8 sm:p-10 bg-[#f5efe4] dark:bg-stone-900/70 rounded-3xl border border-[#e2d7c5] dark:border-stone-800 shadow-2xs transition-all duration-300 text-center flex flex-col items-center justify-center relative group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 18, scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="w-12 h-12 rounded-2xl bg-orange-100/90 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-5 shadow-xs group-hover:bg-orange-600 group-hover:text-white transition-colors"
            >
              <Quote className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f25c27] dark:text-[#ff7849] mb-3 group-hover:scale-102 transition-transform">
              Real Impact
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Together, we are making a difference in the lives of children and families.
            </p>
          </motion.div>

          {/* Card 2: Community Voices */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)' }}
            className="p-8 sm:p-10 bg-[#f5efe4] dark:bg-stone-900/70 rounded-3xl border border-[#e2d7c5] dark:border-stone-800 shadow-2xs transition-all duration-300 text-center flex flex-col items-center justify-center relative group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: -18, scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="w-12 h-12 rounded-2xl bg-orange-100/90 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-5 shadow-xs group-hover:bg-orange-600 group-hover:text-white transition-colors"
            >
              <Quote className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f25c27] dark:text-[#ff7849] mb-3 group-hover:scale-102 transition-transform">
              Community Voices
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Hear from those whose lives have been changed by our dedicated efforts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
