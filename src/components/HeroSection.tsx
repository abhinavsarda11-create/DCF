import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, School, GraduationCap, HandHeart, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { HERO_SLIDES, STATS_DATA } from '../data';
import { useGoldenBurst } from './GoldenSparkles';

interface HeroSectionProps {
  onOpenPledge?: () => void;
}

export function HeroSection({ onOpenPledge }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const { triggerGoldenBurst } = useGoldenBurst();

  // Auto advance slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'school':
        return <School className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'students':
        return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'volunteers':
        return <HandHeart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      case 'parents':
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
      default:
        return <School className="w-5 h-5 text-white" />;
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 1.2, ease: 'easeOut' as const },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <section id="home" className="relative w-full min-h-[640px] sm:min-h-[720px] lg:h-[780px] overflow-hidden bg-stone-950 flex items-center justify-center">
      {/* Background Slides with Directional Transition */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={HERO_SLIDES[currentSlide].image}
            alt="Dawn Child Community Care"
            className="w-full h-full object-cover object-center brightness-[0.75]"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
        </motion.div>
      </AnimatePresence>

      {/* Left Chevron Button with spring bounce */}
      <motion.button
        onClick={handlePrev}
        whileHover={{ scale: 1.15, backgroundColor: 'rgba(0,0,0,0.75)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/15 cursor-pointer shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.button>

      {/* Right Chevron Button with spring bounce */}
      <motion.button
        onClick={handleNext}
        whileHover={{ scale: 1.15, backgroundColor: 'rgba(0,0,0,0.75)' }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md transition-colors border border-white/15 cursor-pointer shadow-lg"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </motion.button>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
        {/* Not Yet Parent Pledge Announcement Pill */}
        {onOpenPledge && (
          <motion.button
            onClick={(e) => {
              triggerGoldenBurst(e.clientX, e.clientY, 28);
              onOpenPledge();
            }}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-400/50 backdrop-blur-md text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide shadow-lg cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>&ldquo;Not Yet&rdquo; Parent Pledge (2025–2026)</span>
            <span className="text-white/60">•</span>
            <span className="text-white font-bold flex items-center gap-1">
              Take Pledge <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        )}

        {/* Main Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${currentSlide}`}
            initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-tight sm:leading-[1.18] tracking-tight max-w-4xl drop-shadow-md select-none"
          >
            {HERO_SLIDES[currentSlide].heading}
          </motion.h1>
        </AnimatePresence>

        {/* Floating Glassmorphic Stats Card with Interactive Float & Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          whileHover={{ y: -4 }}
          className="mt-12 sm:mt-16 w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-black/45 backdrop-blur-md border border-white/25 px-4 sm:px-8 py-6 shadow-2xl transition-all duration-300"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {STATS_DATA.map((stat, idx) => (
              <motion.div
                key={stat.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`flex items-center gap-3 sm:gap-4 justify-center group cursor-pointer ${
                  idx > 0 ? 'pt-3 sm:pt-0' : ''
                } ${idx > 0 ? 'sm:pl-6' : ''}`}
              >
                {/* Orange Icon Badge with Hover Rotation */}
                <motion.div
                  whileHover={{ rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md flex-shrink-0 group-hover:shadow-orange-500/40 transition-shadow"
                >
                  {getStatIcon(stat.icon)}
                </motion.div>
                {/* Stat Text */}
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none group-hover:text-amber-200 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-stone-200 mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Carousel Navigation Dots with Spring Animation */}
        <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className="p-1 cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                animate={{
                  width: currentSlide === index ? 28 : 10,
                  backgroundColor: currentSlide === index ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="h-2.5 rounded-full"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
