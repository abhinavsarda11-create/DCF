import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Sparkles, ArrowUpRight } from 'lucide-react';
import { SUCCESS_STORIES } from '../data';
import { StoryItem } from '../types';

export function SuccessStoriesSection() {
  const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null);

  return (
    <section id="our-impact" className="py-16 sm:py-24 bg-[#f5efe4] dark:bg-stone-900/40 border-b border-[#e2d7c5] dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Stagger Reveal */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight"
          >
            Success Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-2"
          >
            Real outcomes from parents, educators, and children in our community circles.
          </motion.p>
        </div>

        {/* 3 Cards Grid with Interactive Spring Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SUCCESS_STORIES.map((story, idx) => (
            <motion.div
              key={`${story.id}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer bg-[#fdfbf7] dark:bg-stone-900 rounded-2xl border border-[#e2d7c5] dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with High Quality Photography */}
              <div className="w-full h-52 sm:h-56 relative overflow-hidden bg-stone-900">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Dynamic Warm Vignette / Readability Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

                {/* Subtle Accent Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    story.imageGradient || 'from-orange-600/30 to-amber-500/20'
                  } mix-blend-overlay opacity-60 pointer-events-none`}
                />

                {/* Content Overlay: Header Tag & Animated Arrow Badge */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-xs">
                      {story.category}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 12 }}
                      className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white opacity-90 group-hover:opacity-100 transition-opacity shadow-xs"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <div>
                    <div className="w-10 h-1 rounded-full bg-amber-400 mb-2 group-hover:w-16 transition-all duration-300" />
                    <p className="text-xs text-white/95 font-medium line-clamp-2 drop-shadow-sm leading-snug">
                      {story.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom White Area with Title */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white dark:bg-stone-900">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-amber-400 transition-colors">
                  {story.title}
                </h3>
                <div className="pt-4 flex items-center text-xs font-semibold text-orange-600 dark:text-amber-400 gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="group-hover:underline underline-offset-4">Read Full Story</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="relative w-full max-w-lg bg-[#fdfbf7] dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-[#e2d7c5] dark:border-stone-800"
            >
              {/* Header with real photo backdrop */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-900">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-black/30" />

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors cursor-pointer z-20 backdrop-blur-xs"
                  aria-label="Close story"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <div className="absolute bottom-5 left-6 right-6 z-10">
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/90 text-white shadow-xs">
                    {selectedStory.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-2 text-white tracking-tight drop-shadow-sm">
                    {selectedStory.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs">
                  <Sparkles className="w-4 h-4 text-orange-500 dark:text-amber-400" />
                  <span>Documented Field Impact • Dawn Child Center</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                  {selectedStory.fullStory}
                </p>
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedStory(null)}
                    className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white text-xs font-medium tracking-wide transition-colors cursor-pointer shadow-sm"
                  >
                    Close Story
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
