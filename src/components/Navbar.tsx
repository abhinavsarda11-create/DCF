import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Heart, Sun, Moon, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_ITEMS } from '../data';
import { useGoldenBurst } from './GoldenSparkles';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenDonate: () => void;
  onOpenPledge?: () => void;
  onNavigateHome?: () => void;
  onNavigateSection?: (href: string) => void;
}

export function Navbar({ onOpenDonate, onOpenPledge, onNavigateHome, onNavigateSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { triggerGoldenBurst } = useGoldenBurst();
  const { isDark, toggleTheme } = useTheme();

  const handleDonateClick = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 36);
    onOpenDonate();
  };

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 20);
    toggleTheme();
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#home') {
      e.preventDefault();
      onNavigateHome?.();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(href);
    }
  };

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-50 bg-[#fbf8f3]/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-[#ebdcc9] dark:border-stone-800 shadow-xs transition-colors duration-200">
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-[#f25c27] to-red-500 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with gentle hover spring */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome?.();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="focus:outline-hidden cursor-pointer"
          aria-label="Dawn Child Home"
        >
          <Logo />
        </motion.a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-7 text-sm lg:text-[15px] font-normal text-stone-700 dark:text-stone-300"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isHovered = hoveredLink === item.label;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                onMouseEnter={() => setHoveredLink(item.label)}
                className="relative py-2 px-1 cursor-pointer font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                {isHovered && (
                  <motion.div
                    layoutId="navbar-hover-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f25c27] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button & Dark Mode Switcher */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Dark Mode Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleThemeToggle}
            className="p-2.5 rounded-full border border-stone-200 dark:border-stone-700/80 bg-stone-100/80 dark:bg-stone-800/80 text-stone-700 dark:text-amber-300 hover:text-orange-600 dark:hover:text-amber-200 transition-colors shadow-xs cursor-pointer flex items-center justify-center"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 fill-amber-300/40 text-amber-300 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </motion.button>

          {/* Take Pledge Button */}
          {onOpenPledge && (
            <motion.button
              onClick={(e) => {
                triggerGoldenBurst(e.clientX, e.clientY, 24);
                onOpenPledge();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="relative px-4 py-2 rounded-full border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50/70 hover:bg-emerald-100/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs sm:text-sm tracking-wide shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="Take Not Yet Parent Pledge"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Take Pledge</span>
            </motion.button>
          )}

          <motion.button
            onClick={handleDonateClick}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.45), 0 0 22px 3px rgba(251, 191, 36, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center gap-2 group ring-2 ring-amber-300/80 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          >
            {/* Golden-amber light sweep animation */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.8 }}
              className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-amber-200/50 to-transparent skew-x-12 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <Heart className="w-4 h-4 fill-amber-200 text-amber-200" />
            </motion.div>
            <span className="relative z-10 text-white font-bold drop-shadow-xs">Donate Now</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleThemeToggle}
            className="p-2 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-amber-300 cursor-pointer"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleDonateClick}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white font-semibold text-xs shadow-sm ring-1.5 ring-amber-300/60"
          >
            Donate
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-[#ebdcc9] dark:border-stone-800 bg-[#fbf8f3] dark:bg-stone-950 px-4 pt-3 pb-6 shadow-xl overflow-hidden"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
              className="flex flex-col space-y-2"
            >
              {NAV_ITEMS.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -15 },
                  }}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleLinkClick(e, item.href);
                  }}
                  className="px-3 py-2 text-stone-700 dark:text-stone-200 hover:text-orange-600 dark:hover:text-amber-400 hover:bg-orange-50/60 dark:hover:bg-stone-800/60 rounded-lg text-base font-medium transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 },
                }}
                className="pt-2 flex flex-col gap-2.5"
              >
                {onOpenPledge && (
                  <button
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      triggerGoldenBurst(e.clientX, e.clientY, 20);
                      onOpenPledge();
                    }}
                    className="w-full py-2.5 rounded-full border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Take &ldquo;Not Yet&rdquo; Parent Pledge</span>
                  </button>
                )}

                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleDonateClick(e);
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 ring-2 ring-amber-300/70"
                >
                  <Heart className="w-4 h-4 fill-amber-200 text-white" />
                  <span>Donate Now</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
