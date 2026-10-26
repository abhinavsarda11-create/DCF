import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ArrowLeft,
  RotateCw,
  Sparkles,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Heart,
  Users,
  BookOpen,
  School,
  Shield,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useGoldenBurst } from './GoldenSparkles';
import {
  RISE_WITH_LOVE_QUADRANTS,
  PARIVAAR_PARIVARTAN_SHAALA_CURRICULUM,
} from '../data';
import { ShaalaCurriculumWeek } from '../types';

interface ParentingJourneyDetailsPageProps {
  onBack: () => void;
  onOpenDonate?: () => void;
  onOpenVolunteer?: () => void;
  onOpenPledge?: () => void;
}

interface SectionData {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  gradientClass: string;
  cardBorderClass: string;
  points: string[];
  reversed?: boolean;
}

const SECTIONS: SectionData[] = [
  {
    id: 'challenges',
    tag: 'Our Challenges',
    title: 'Navigating the Parenting Journey',
    description:
      'Parenting is beautiful but challenging. At Dawn Child Foundation, we empower parents with tools to manage stress and nurture their child\'s growth with confidence.',
    imageUrl:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Mother and child in a heartfelt parenting moment',
    gradientClass: 'from-[#5965e6]/70 to-[#7949bd]/70',
    cardBorderClass: 'border-indigo-200/50',
    points: [
      'Stress & Emotional Exhaustion',
      'Modern Parenting Dilemmas & Screen Time',
      'Lack of Trusted Guidance & Community',
      'Behavioral & Emotional Dysregulation',
    ],
    reversed: false,
  },
  {
    id: 'solutions',
    tag: 'Our Solutions',
    title: 'Empowering Families for a Brighter Future',
    description:
      'Our model is built on the foundation of connection, community, and care. We employ a multi-faceted approach that includes:',
    imageUrl:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Mother and young child engaged in joyful early learning and communication',
    gradientClass: 'from-[#0ea5e9]/70 to-[#0284c7]/70',
    cardBorderClass: 'border-cyan-200/50',
    points: [
      'Non-Violent Communication',
      'Well-Being',
      'Early Childhood Care and Education',
      'Synthesis',
    ],
    reversed: true,
  },
  {
    id: 'model',
    tag: 'Our Model',
    title: 'A Holistic and Collaborative Framework',
    description:
      'Parenting is beautiful but challenging. At Dawn Child Foundation, we empower parents with tools to manage stress and nurture their child\'s growth with confidence.',
    imageUrl:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Community caregiver guiding children in a learning circle',
    gradientClass: 'from-[#0d9488]/70 to-[#0f766e]/70',
    cardBorderClass: 'border-teal-200/50',
    points: [
      'Connection & Empathetic Presence',
      'Community-Driven Circles',
      'Continuous Holistic Care',
      'Synthesis of Science & Culture',
    ],
    reversed: false,
  },
  {
    id: 'programs',
    tag: 'Our Programs',
    title: 'Tailored Initiatives for Lasting Impact',
    description:
      'Our model is built on the foundation of connection, community, and care. We employ a multi-faceted approach that includes:',
    imageUrl:
      'https://images.unsplash.com/photo-1596464716127-f2a829822301?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Young children joyful in early education and development activities',
    gradientClass: 'from-[#f43f5e]/70 to-[#e11d48]/70',
    cardBorderClass: 'border-pink-200/50',
    points: [
      'Non-Violent Communication Workshops',
      'Holistic Well-Being Sessions',
      'Early Childhood Care Curriculum',
      'Synthesis & Integration Circles',
    ],
    reversed: true,
  },
];

interface FlipBoxProps {
  section: SectionData;
}

function FlipBox({ section }: FlipBoxProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { triggerGoldenBurst } = useGoldenBurst();

  const handleFlip = (e: React.MouseEvent) => {
    triggerGoldenBurst(e.clientX, e.clientY, 16);
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="w-full h-72 sm:h-84 lg:h-96 cursor-pointer select-none [perspective:1200px] group"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.4, 0.2, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* FRONT SIDE */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-xl border ${section.cardBorderClass} p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.015] bg-stone-900`}
        >
          <img
            src={section.imageUrl}
            alt={section.imageAlt}
            className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-108"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none" />
          <div className={`absolute inset-0 bg-gradient-to-br ${section.gradientClass} mix-blend-multiply opacity-50 pointer-events-none`} />

          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wide shadow-md">
              {section.tag}
            </span>
            <span className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 group-hover:rotate-180 transition-transform duration-500">
              <RotateCw className="w-4 h-4" />
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div className="space-y-1">
              <p className="text-white text-base sm:text-lg font-bold leading-tight drop-shadow-md">
                {section.title}
              </p>
              <p className="text-amber-200/90 text-xs font-semibold flex items-center gap-1.5">
                <span>Click to view key focus areas</span>
                <RotateCw className="w-3 h-3" />
              </p>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 w-full h-full rounded-3xl bg-[#fdfbf7] dark:bg-stone-900 shadow-2xl border-2 border-[#ea580c]/30 p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-amber-100/60 dark:from-amber-900/30 via-orange-50/30 dark:via-orange-950/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between border-b border-[#ebdcc9] dark:border-stone-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] dark:text-amber-400">
              {section.tag} • Key Focus Areas
            </span>
            <span className="text-stone-400 dark:text-stone-500 text-xs flex items-center gap-1">
              <span>Click to flip back</span>
              <RotateCw className="w-3 h-3" />
            </span>
          </div>

          <div className="relative z-10 my-auto py-2">
            <ul className="space-y-3.5 sm:space-y-4">
              {section.points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#ea580c] dark:text-amber-400 shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <span className="text-stone-800 dark:text-stone-100 text-sm sm:text-base lg:text-[17px] font-semibold tracking-tight">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ParentingJourneyDetailsPage({
  onBack,
  onOpenDonate,
  onOpenVolunteer,
  onOpenPledge,
}: ParentingJourneyDetailsPageProps) {
  const { triggerGoldenBurst } = useGoldenBurst();
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const handleBackClick = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 20);
    onBack();
  };

  const scrollToAnchor = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    triggerGoldenBurst(e.clientX, e.clientY, 15);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter curriculum based on search
  const filteredCurriculum = PARIVAAR_PARIVARTAN_SHAALA_CURRICULUM.filter(
    (item) =>
      item.theme.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
      item.focus.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
      item.week.toString().includes(curriculumSearch.trim()) ||
      item.detailedPoints?.some((p) => p.toLowerCase().includes(curriculumSearch.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-[#fbf8f3] dark:bg-stone-950 min-h-screen text-stone-900 dark:text-stone-100 transition-colors duration-200"
    >
      {/* Sticky Back Button & Jump Navigation Header */}
      <div className="sticky top-0 z-40 bg-[#f5efe4]/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-[#ebdcc9] dark:border-stone-800 py-3 px-4 sm:px-8 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <motion.button
            onClick={handleBackClick}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-200 hover:text-[#ea580c] dark:hover:text-amber-400 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </motion.button>

          {/* Quick Jump Anchor Tabs & Pledge Button */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="hidden md:flex items-center gap-2">
              <a
                href="#rise-with-love"
                onClick={(e) => scrollToAnchor('rise-with-love', e)}
                className="px-3 py-1.5 rounded-full bg-[#ebdcc9]/50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#ea580c] hover:text-white dark:hover:bg-[#ea580c] transition-all"
              >
                RISE with LOVE Model
              </a>
              <a
                href="#flagship-programme"
                onClick={(e) => scrollToAnchor('flagship-programme', e)}
                className="px-3 py-1.5 rounded-full bg-[#ebdcc9]/50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#ea580c] hover:text-white dark:hover:bg-[#ea580c] transition-all"
              >
                Parivaar Parivartan Shaala
              </a>
              <a
                href="#core-pillars"
                onClick={(e) => scrollToAnchor('core-pillars', e)}
                className="px-3 py-1.5 rounded-full bg-[#ebdcc9]/50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#ea580c] hover:text-white dark:hover:bg-[#ea580c] transition-all"
              >
                4 Core Pillars
              </a>
            </div>

            {onOpenPledge && (
              <button
                onClick={(e) => {
                  triggerGoldenBurst(e.clientX, e.clientY, 20);
                  onOpenPledge();
                }}
                className="px-3 sm:px-4 py-1.5 rounded-full border-2 border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Take Pledge</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Banner with Golden Radiance */}
      <section className="relative w-full bg-gradient-to-r from-[#c2410c] via-[#ea580c] via-[#f59e0b] via-[#ea580c] to-[#c2410c] py-20 sm:py-28 text-white text-center px-4 sm:px-6 lg:px-8 overflow-hidden shadow-inner border-b border-amber-300/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,224,71,0.36),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_120%,rgba(245,158,11,0.3),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/15 backdrop-blur-md border border-amber-300/50 text-amber-100 text-xs font-bold uppercase tracking-wider mb-2 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
            <span>Comprehensive Parenting Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-tight select-none drop-shadow-md text-white">
            Nurturing Families, Transforming Futures.
          </h1>
          <p className="text-white/95 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Empowering parents and caregivers to build resilient, loving environments for their children.
          </p>

          {/* Quick jump anchor pill buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#rise-with-love"
              onClick={(e) => scrollToAnchor('rise-with-love', e)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <span>Explore RISE with LOVE Model</span>
              <span>↓</span>
            </a>
            <a
              href="#flagship-programme"
              onClick={(e) => scrollToAnchor('flagship-programme', e)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <span>10-Week Flagship Curriculum</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: Our Model — RISE with LOVE (As shown in Screenshot 1) */}
      {/* ========================================================================= */}
      <section id="rise-with-love" className="py-20 sm:py-24 border-b border-[#ebdcc9] dark:border-stone-800 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#ea580c] dark:text-[#ff7849] tracking-tight leading-tight mb-3">
              Our Model — RISE with LOVE
            </h2>
            <p className="italic text-stone-500 dark:text-stone-400 text-sm sm:text-base font-normal tracking-wide">
              Parent Wellbeing &rarr; Communication &amp; Relationships &rarr; Early Childhood Development &rarr; RISE with LOVE
            </p>

            {/* Visual Process Badges */}
            <div className="hidden sm:flex items-center justify-center gap-2 mt-6 text-xs font-semibold text-stone-600 dark:text-stone-300">
              <span className="px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-[#ea580c] dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                1. Parent Wellbeing
              </span>
              <span className="text-[#ea580c] font-bold">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                2. Communication &amp; Relationships
              </span>
              <span className="text-[#ea580c] font-bold">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
                3. Early Childhood Development
              </span>
              <span className="text-[#ea580c] font-bold">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-[#ea580c] text-white font-bold shadow-xs">
                4. RISE with LOVE
              </span>
            </div>
          </div>

          {/* 4 Quadrants Grid (2x2 Cards with orange top border, exact text & layout from Screenshot 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {RISE_WITH_LOVE_QUADRANTS.map((quadrant, idx) => (
              <motion.div
                key={quadrant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-[#fefaf4] dark:bg-stone-900 rounded-2xl sm:rounded-3xl border border-[#ebdcc9] dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col p-6 sm:p-8 group"
              >
                {/* Solid Orange Top Accent Border (from Screenshot 1) */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ea580c] transition-all duration-300 group-hover:h-2" />

                {/* Quadrant Title */}
                <div className="flex items-center justify-between mb-4 pt-1">
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#ea580c] dark:text-[#ff7849]">
                    {quadrant.title}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#ea580c]/40 group-hover:bg-[#ea580c] transition-colors" />
                </div>

                {/* Bullet Items with Chevron Carets & Subtle Divider Lines */}
                <ul className="space-y-0 divide-y divide-[#ebdcc9]/60 dark:divide-stone-800/80">
                  {quadrant.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="py-3 flex items-start text-stone-700 dark:text-stone-200 text-sm sm:text-[15px] font-medium leading-snug group-hover:text-stone-900 dark:group-hover:text-white transition-colors"
                    >
                      <span className="text-[#ea580c] font-bold text-lg select-none mr-2.5 shrink-0 leading-none">
                        &rsaquo;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Our Flagship Programme — Parivaar Parivartan Shaala (Screenshot 2 & 3) */}
      {/* ========================================================================= */}
      <section id="flagship-programme" className="py-20 sm:py-24 border-b border-[#ebdcc9] dark:border-stone-800 scroll-mt-16 bg-[#f8f4ec] dark:bg-stone-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-4xl mx-auto mb-10 text-left">
            {/* Pill Tag (Exact from Screenshot 2: OUR FLAGSHIP PROGRAMME) */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#ea580c] text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              OUR FLAGSHIP PROGRAMME
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight mb-5">
              Parivaar Parivartan Shaala
            </h2>

            {/* Narrative Paragraphs (Exact wording from Screenshot 2) */}
            <div className="space-y-4 text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
              <p>
                Parivaar Parivartan Shaala is our 10-week flagship parenting programme delivered in communities across South Delhi. It brings together parents and caregivers in a structured, reflective learning space where they build skills, share experiences, and support one another.
              </p>
              <p>
                Each session uses storytelling, role-play, discussion, and creative activities to explore real-life parenting challenges &mdash; from managing anger and setting boundaries to supporting children's learning and building stronger families.
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search themes (e.g. NVC, Play, Safety)..."
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-[#ebdcc9] dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#ea580c]/50"
              />
              {curriculumSearch && (
                <button
                  onClick={() => setCurriculumSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Showing {filteredCurriculum.length} of {PARIVAAR_PARIVARTAN_SHAALA_CURRICULUM.length} weeks
              <span className="ml-2 text-[#ea580c] font-semibold hidden sm:inline">• Click any row for details</span>
            </div>
          </div>

          {/* Curriculum Table (Matching Screenshot 2 & 3 with Orange Header & Styled Rows) */}
          <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-[#ebdcc9] dark:border-stone-800 overflow-hidden shadow-md bg-white dark:bg-stone-900">
            {/* Table Header with Orange Background */}
            <div className="bg-[#ea580c] text-white py-3.5 px-4 sm:px-6 flex items-center font-bold text-xs sm:text-sm tracking-wider uppercase select-none">
              <div className="w-16 sm:w-24 shrink-0">WEEK</div>
              <div className="w-40 sm:w-56 shrink-0">THEME</div>
              <div className="flex-1">FOCUS</div>
              <div className="w-6 shrink-0 hidden sm:block"></div>
            </div>

            {/* Table Rows (Weeks 1 to 10) */}
            <div className="divide-y divide-[#ebdcc9]/50 dark:divide-stone-800">
              {filteredCurriculum.map((weekItem) => {
                const isExpanded = expandedWeek === weekItem.week;

                return (
                  <div
                    key={weekItem.week}
                    onClick={() => setExpandedWeek(isExpanded ? null : weekItem.week)}
                    className={`cursor-pointer transition-colors duration-150 ${
                      weekItem.week % 2 === 1
                        ? 'bg-[#fefaf4] dark:bg-stone-900/90'
                        : 'bg-white dark:bg-stone-900/40'
                    } hover:bg-amber-100/50 dark:hover:bg-amber-950/30`}
                  >
                    {/* Main Row */}
                    <div className="py-3.5 sm:py-4 px-4 sm:px-6 flex items-start text-xs sm:text-sm">
                      {/* Week Number in Bold Orange */}
                      <div className="w-16 sm:w-24 shrink-0 font-bold text-base sm:text-lg text-[#ea580c] leading-none pt-0.5">
                        {weekItem.week}
                      </div>

                      {/* Theme Name in Bold */}
                      <div className="w-40 sm:w-56 shrink-0 font-bold text-stone-900 dark:text-white pr-3 leading-snug">
                        {weekItem.theme}
                      </div>

                      {/* Focus Description */}
                      <div className="flex-1 text-stone-600 dark:text-stone-300 leading-relaxed pr-2">
                        {weekItem.focus}
                      </div>

                      {/* Expand / Collapse Indicator */}
                      <div className="w-6 shrink-0 flex items-center justify-end text-stone-400 group-hover:text-[#ea580c] pt-0.5">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#ea580c]" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Expandable Details Drawer */}
                    <AnimatePresence>
                      {isExpanded && weekItem.detailedPoints && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-4 pt-1 bg-amber-50/60 dark:bg-amber-950/20 border-t border-amber-200/50 dark:border-stone-800/80 overflow-hidden"
                        >
                          <div className="pl-16 sm:pl-24 space-y-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c]">
                              Session Highlights &amp; Workshop Practices:
                            </span>
                            <ul className="space-y-1.5">
                              {weekItem.detailedPoints.map((point, pIdx) => (
                                <li
                                  key={pIdx}
                                  className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2"
                                >
                                  <span className="text-[#ea580c] font-bold text-xs mt-0.5">&bull;</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredCurriculum.length === 0 && (
                <div className="py-12 text-center text-stone-500 dark:text-stone-400">
                  <p className="font-semibold text-sm">No curriculum themes match your search.</p>
                  <button
                    onClick={() => setCurriculumSearch('')}
                    className="mt-2 text-xs font-bold text-[#ea580c] hover:underline"
                  >
                    Clear search filter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Callout for Programme Involvement */}
          <div className="max-w-4xl mx-auto mt-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-200/60 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-stone-900 dark:text-white">
                Bring Parivaar Parivartan Shaala to Your Neighbourhood
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-lg">
                We partner with community leaders, schools, and volunteers to host active 10-week cohorts across Delhi NCR.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {onOpenVolunteer && (
                <button
                  onClick={onOpenVolunteer}
                  className="px-4 py-2.5 rounded-full bg-[#ea580c] hover:bg-[#d94806] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Join as Facilitator
                </button>
              )}
              {onOpenDonate && (
                <button
                  onClick={onOpenDonate}
                  className="px-4 py-2.5 rounded-full bg-white dark:bg-stone-800 hover:bg-stone-50 text-stone-800 dark:text-stone-100 border border-[#ebdcc9] dark:border-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  Sponsor a Cohort
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: 4 Core Pillars (Interactive 3D Flip Cards) */}
      {/* ========================================================================= */}
      <section id="core-pillars" className="py-20 sm:py-28 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] dark:text-[#ff7849] mb-2 block">
              Core Methodologies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight mb-3">
              Interactive Pillars • Challenges, Solutions &amp; Model
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
              Click or tap any card below to flip and explore key focus areas and field strategies.
            </p>
          </div>

          <div className="space-y-24 sm:space-y-32">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Box Column */}
                <motion.div
                  initial={{ opacity: 0, x: section.reversed ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`lg:col-span-6 flex justify-center ${
                    section.reversed ? 'order-1 lg:order-2' : ''
                  }`}
                >
                  <FlipBox section={section} />
                </motion.div>

                {/* Content Column */}
                <motion.div
                  initial={{ opacity: 0, x: section.reversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`lg:col-span-6 flex flex-col items-start ${
                    section.reversed ? 'order-2 lg:order-1' : ''
                  }`}
                >
                  <span className="text-[#ea580c] dark:text-[#ff7849] text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                    {section.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight mb-5">
                    {section.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
                    {section.description}
                  </p>
                </motion.div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
