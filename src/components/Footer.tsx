import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Instagram, Youtube, MapPin, Phone, HelpCircle, ChevronDown, Plus, Minus, Sparkles, Share2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { FAQ_LIST } from '../data';
import { useGoldenBurst } from './GoldenSparkles';

interface FooterProps {
  isFaqOpen?: boolean;
  onToggleFaq?: () => void;
  onOpenPledge?: () => void;
}

export function Footer({ isFaqOpen: controlledFaqOpen, onToggleFaq, onOpenPledge }: FooterProps) {
  const [internalFaqOpen, setInternalFaqOpen] = useState(false);
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1']);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { triggerGoldenBurst } = useGoldenBurst();

  const isFaqOpen = controlledFaqOpen !== undefined ? controlledFaqOpen : internalFaqOpen;

  const handleToggleFaq = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 18);
    if (onToggleFaq) {
      onToggleFaq();
    } else {
      setInternalFaqOpen((prev) => !prev);
    }
  };

  const toggleFaqItem = (id: string, e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 12);
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="get-involved"
      className="relative bg-gradient-to-r from-[#c2410c] via-[#ea580c] via-[#f59e0b] via-[#ea580c] to-[#c2410c] text-white pt-12 pb-8 overflow-hidden shadow-inner border-t border-amber-300/30"
    >
      {/* Eye-engaging Golden Sunlight Radiance Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,224,71,0.3),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_100%,rgba(245,158,11,0.25),rgba(255,255,255,0))] pointer-events-none" />

      {/* Subtle Golden shimmer orb */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-radial from-amber-300/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Content Area: Centered Layout with Logo, Tagline & Contact */}
        <div className="flex flex-col items-center text-center pb-8 border-b border-white/20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer select-none inline-flex mb-3"
          >
            <Logo variant="white" size="lg" />
          </motion.div>

          {/* Mission Tagline */}
          <p className="text-white/90 text-sm sm:text-base max-w-xl leading-relaxed mb-4 font-medium">
            Empowers parents, nurture children's minds — Creating ripple effects for healthier generations.
          </p>

          {/* Take Not Yet Parent Pledge Button */}
          {onOpenPledge && (
            <motion.button
              onClick={(e) => {
                triggerGoldenBurst(e.clientX, e.clientY, 24);
                onOpenPledge();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-6 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg border border-emerald-300/40 cursor-pointer inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Take the &ldquo;Not Yet&rdquo; Parent Pledge (2025–2026)</span>
            </motion.button>
          )}

          {/* Contact Details Cards: Address & Phone */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/95 max-w-3xl">
            {/* Address */}
            <div className="flex items-center gap-2.5 bg-black/15 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/15 shadow-xs">
              <MapPin className="w-4 h-4 text-amber-200 shrink-0" />
              <span className="leading-snug text-left text-xs sm:text-sm">
                206 Second Floor, Block A, Shivalik, Malviya Nagar, New Delhi, Pin - 110017
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5 bg-black/15 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/15 shadow-xs">
              <Phone className="w-4 h-4 text-amber-200 shrink-0" />
              <a
                href="tel:+919311323002"
                className="hover:underline font-mono text-xs sm:text-sm tracking-wide hover:text-amber-100 transition-colors"
              >
                +91 93113 23002
              </a>
            </div>
          </div>
        </div>

        {/* ================= SEPARATE FAQ SECTION IN FOOTER ================= */}
        <div id="faq" className="w-full my-8 scroll-mt-6">
          <div className="flex flex-col items-center">
            {/* Clickable Card / Bar to Toggle FAQ */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleToggleFaq}
              className="w-full max-w-3xl bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/25 hover:border-amber-200/50 rounded-2xl p-4 sm:p-5 flex items-center justify-between text-left transition-all cursor-pointer group shadow-lg ring-1 ring-white/10"
              aria-expanded={isFaqOpen}
              aria-controls="footer-faq-accordion"
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-400/25 border border-amber-300/40 flex items-center justify-center text-amber-200 group-hover:scale-105 transition-transform shrink-0">
                  <HelpCircle className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-100 transition-colors">
                      Frequently Asked Questions (FAQs)
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-amber-100 border border-white/20">
                      <Sparkles className="w-3 h-3 text-amber-200" /> Help Desk
                    </span>
                  </div>
                  <p className="text-xs text-white/80 mt-0.5">
                    {isFaqOpen
                      ? 'Click to collapse FAQ answers'
                      : 'Have questions? Click here to view answers about donations, volunteering & programs'}
                  </p>
                </div>
              </div>

              {/* Action Button Indicator */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-bold px-3 sm:px-4 py-2 rounded-xl bg-white/20 group-hover:bg-white/30 text-white border border-white/25 transition-all shrink-0">
                <span>{isFaqOpen ? 'Hide FAQs' : 'View FAQs'}</span>
                <ChevronDown
                  className={`w-4 h-4 text-amber-200 transition-transform duration-300 ${
                    isFaqOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </motion.button>

            {/* Accordion that appears when clicked */}
            <AnimatePresence>
              {isFaqOpen && (
                <motion.div
                  id="footer-faq-accordion"
                  initial={{ opacity: 0, height: 0, y: -12 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full max-w-3xl mt-4 space-y-3 overflow-hidden text-left"
                >
                  <div className="bg-black/15 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/15">
                      <span className="text-xs sm:text-sm font-semibold text-amber-200">
                        Common Questions & Answers
                      </span>
                      <span className="text-[11px] text-white/70">
                        {FAQ_LIST.length} questions available
                      </span>
                    </div>

                    {FAQ_LIST.map((item) => {
                      const isOpen = openFaqIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className="bg-black/20 hover:bg-black/25 backdrop-blur-xs rounded-xl border border-white/15 overflow-hidden transition-all shadow-xs"
                        >
                          <button
                            type="button"
                            onClick={(e) => toggleFaqItem(item.id, e)}
                            className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-left text-white hover:text-amber-100 transition-colors font-semibold text-sm sm:text-base cursor-pointer focus:outline-hidden"
                            aria-expanded={isOpen}
                          >
                            <span className="pr-4">{item.question}</span>
                            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-amber-200 shrink-0">
                              {isOpen ? (
                                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                              ) : (
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              )}
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-white/90 leading-relaxed border-t border-white/10">
                                  {item.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* "Know More" button opening the Linktree directory */}
            <div className="mt-6 flex flex-col items-center">
              <motion.a
                href="https://linktr.ee/Dawnchildnow"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 20px 3px rgba(251, 191, 36, 0.45)',
                }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-2.5 rounded-full bg-black/25 hover:bg-black/35 backdrop-blur-md border border-white/30 hover:border-amber-300 text-white hover:text-amber-100 font-bold text-sm tracking-wide shadow-md transition-all flex items-center gap-2 group ring-1 ring-white/20 cursor-pointer"
                aria-label="Know More - Open Dawn Child Linktree"
              >
                <span>Know More</span>
                <ExternalLink className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
              <span className="text-[11px] text-white/80 mt-1.5 font-medium">
                Connect with our full linktree directory, social channels & resources
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Instagram & YouTube Links + Copyright */}
        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <div className="text-xs sm:text-sm font-semibold text-white">
              © 2026 Dawn Child Foundation. All rights reserved.
            </div>
            <div className="text-[11px] sm:text-xs text-white/80">
              Website Developed and Managed by{' '}
              <a
                href="#anukash"
                className="underline underline-offset-2 hover:text-white transition-colors font-medium"
              >
                Anukash Solutions
              </a>{' '}
              under its NGO Sathi Program
            </div>
          </div>

          {/* Social Links: YouTube, Linktree & Instagram */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <motion.a
              href="https://www.youtube.com/@dawnchildnow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Dawn Child on YouTube"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all shadow-xs"
            >
              <Youtube className="w-4 h-4 text-amber-200" />
              <span>YouTube</span>
            </motion.a>

            <motion.a
              href="https://linktr.ee/Dawnchildnow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Dawn Child on Linktree"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all shadow-xs"
            >
              <Share2 className="w-4 h-4 text-amber-200" />
              <span>Linktree</span>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/dawnchildnow?stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Dawn Child on Instagram"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all shadow-xs"
            >
              <Instagram className="w-4 h-4 text-amber-200" />
              <span>Instagram</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-24 right-7.5 z-30 w-11 h-11 rounded-full bg-gradient-to-tr from-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white flex items-center justify-center shadow-xl border border-amber-200/50 ring-2 ring-amber-300/60 cursor-pointer hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
