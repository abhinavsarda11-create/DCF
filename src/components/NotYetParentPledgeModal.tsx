import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Check,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Heart,
  Share2,
  ArrowRight,
  RotateCcw,
  Award,
  Smartphone,
  Users,
  Compass,
  CheckCheck,
} from 'lucide-react';
import { useGoldenBurst } from './GoldenSparkles';

export interface NotYetParentPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonate?: () => void;
}

export interface PledgeStatement {
  id: number;
  statement: string;
  theme: string;
  iconBg: string;
}

export const PLEDGE_STATEMENTS: PledgeStatement[] = [
  {
    id: 1,
    statement: 'I will NOT give my child a smartphone until the end of Class 9.',
    theme: 'Class 9 Smartphone Delay',
    iconBg: 'from-amber-500 to-orange-600',
  },
  {
    id: 2,
    statement:
      'I will NOT allow social media (Facebook, Instagram, Snapchat, YouTube Shorts, Instagram Reels, etc.) until my child turns 16.',
    theme: 'Age 16 Social Media Boundary',
    iconBg: 'from-rose-500 to-red-600',
  },
  {
    id: 3,
    statement:
      'I will encourage unsupervised free play, exploration, and creativity without devices.',
    theme: 'Device-Free Creative Play',
    iconBg: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    statement:
      'I will support phone-free learning spaces in classrooms, tuition centres, and play schools.',
    theme: 'Phone-Free Educational Spaces',
    iconBg: 'from-indigo-500 to-violet-600',
  },
];

export function NotYetParentPledgeModal({
  isOpen,
  onClose,
  onOpenDonate,
}: NotYetParentPledgeModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const { triggerGoldenBurst } = useGoldenBurst();
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check speech synthesis support on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasSpeechSupport(true);
    } else {
      setHasSpeechSupport(false);
    }
  }, []);

  // Stop any active speech
  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      activeUtteranceRef.current = null;
    }
  }, []);

  // Cancel speech on unmount or modal close
  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
    }
  }, [isOpen, stopSpeech]);

  // Clean speech when step changes
  useEffect(() => {
    stopSpeech();
  }, [currentStepIndex, isCompleted, stopSpeech]);

  // Focus accept button when statement changes
  useEffect(() => {
    if (isOpen && !isCompleted) {
      const timer = setTimeout(() => {
        acceptButtonRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStepIndex, isCompleted]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        stopSpeech();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, stopSpeech]);

  // Read Aloud Handler using native Web Speech API
  const handleToggleReadAloud = () => {
    if (!hasSpeechSupport) return;

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    const currentStatement = PLEDGE_STATEMENTS[currentStepIndex];
    if (!currentStatement) return;

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(currentStatement.statement);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      null;

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      activeUtteranceRef.current = null;
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
      activeUtteranceRef.current = null;
    };

    activeUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Handle Accept Statement
  const handleAcceptStatement = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return;

    stopSpeech();
    triggerGoldenBurst(e.clientX, e.clientY, 24);

    setIsTransitioning(true);

    if (currentStepIndex < PLEDGE_STATEMENTS.length - 1) {
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 350);
    } else {
      // Completed all 4 pledges
      setTimeout(() => {
        setIsCompleted(true);
        setIsTransitioning(false);
        triggerGoldenBurst(window.innerWidth / 2, window.innerHeight / 2 - 50, 48);

        // Store local completion badge
        try {
          localStorage.setItem(
            'dcf_not_yet_pledge_status',
            JSON.stringify({
              completed: true,
              schoolYear: '2025–2026',
              timestamp: new Date().toISOString(),
            })
          );
        } catch {
          // ignore localStorage error
        }

        // Post pledge to backend API in background
        fetch('/api/pledge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            parentName: 'Committed Parent / Caregiver',
            schoolYear: '2025–2026',
            commitments: {
              noSmartphoneUntilClass9: true,
              noSocialMediaUntil16: true,
              encourageDeviceFreePlay: true,
              supportPhoneFreeClassrooms: true,
            },
          }),
        }).catch((err) => console.log('Pledge backend sync notice:', err));
      }, 400);
    }
  };

  const handleResetPledge = () => {
    stopSpeech();
    setCurrentStepIndex(0);
    setIsCompleted(false);
    setIsTransitioning(false);
  };

  const handleShare = () => {
    const text = `I just committed to the Dawn Child Foundation "Not Yet" Parent Pledge (2025–2026) to protect childhood, delay smartphones, and keep learning spaces phone-free! Join me:`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      navigator
        .share({
          title: 'DCF "Not Yet" Parent Pledge',
          text,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!isOpen) return null;

  const currentStatement = PLEDGE_STATEMENTS[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / PLEDGE_STATEMENTS.length) * 100);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pledge-dialog-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            stopSpeech();
            onClose();
          }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative w-full max-w-2xl bg-[#fbf8f3] dark:bg-stone-900 border border-[#ebdcc9] dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]"
        >
          {/* Decorative Warm Dawn Header Banner */}
          <div className="relative bg-gradient-to-r from-[#c2410c] via-[#ea580c] via-[#f59e0b] to-[#ea580c] p-5 sm:p-7 text-white overflow-hidden shadow-md">
            {/* Sunlight Radiance Orbs */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,224,71,0.35),rgba(255,255,255,0))] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-300/25 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeech();
                onClose();
              }}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white/80"
              aria-label="Close pledge modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Titles */}
            <div className="relative z-10 pr-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-xs border border-amber-300/40 text-amber-100 text-xs font-semibold mb-2 tracking-wide">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
                <span id="pledge-dialog-title">Dawn Child Foundation (DCF)</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white drop-shadow-xs">
                &ldquo;Not Yet&rdquo; Parent Pledge Form
              </h2>

              <p className="text-amber-100/90 text-xs sm:text-sm font-medium mt-1">
                For the 2025–2026 school year (renew next year)
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 flex flex-col justify-between">
            {!isCompleted ? (
              <div className="flex flex-col flex-1">
                {/* Introductory Pledge Box */}
                <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 dark:bg-stone-800/80 border border-amber-200/70 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed shadow-xs">
                  <p className="font-semibold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Foundation Commitment</span>
                  </p>
                  <p className="italic text-stone-600 dark:text-stone-300">
                    &ldquo;I, the undersigned, commit to supporting my child’s healthy growth and real-world connections by delaying smartphone and social media use.&rdquo;
                  </p>
                </div>

                {/* Progress Indicator Bar & Badge */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      Pledge {currentStepIndex + 1} of {PLEDGE_STATEMENTS.length}
                    </span>
                    <span className="text-stone-500 dark:text-stone-400 font-mono text-xs">
                      {progressPercent}% Completed
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-300/40 dark:border-stone-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Step Pills */}
                  <div className="flex justify-between items-center mt-3 px-1">
                    {PLEDGE_STATEMENTS.map((stmt, idx) => {
                      const isPast = idx < currentStepIndex;
                      const isCurrent = idx === currentStepIndex;

                      return (
                        <div key={stmt.id} className="flex items-center gap-1 text-[11px] font-medium">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                              isPast
                                ? 'bg-emerald-600 text-white'
                                : isCurrent
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 ring-2 ring-emerald-500'
                                : 'bg-stone-200 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                            }`}
                          >
                            {isPast ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <span
                            className={`hidden sm:inline ${
                              isCurrent
                                ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                                : isPast
                                ? 'text-stone-700 dark:text-stone-300'
                                : 'text-stone-400 dark:text-stone-600'
                            }`}
                          >
                            Statement {idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Single Active Statement Card with Smooth Motion */}
                <div className="my-auto py-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStatement.id}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-800/90 border-2 border-emerald-500/30 dark:border-emerald-500/20 shadow-xl"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                          {currentStatement.theme}
                        </span>
                        {isSpeaking && (
                          <span className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            Reading statement...
                          </span>
                        )}
                      </div>

                      {/* Large Readable Pledge Statement */}
                      <blockquote
                        aria-live="polite"
                        className="text-xl sm:text-2xl lg:text-[26px] font-bold text-stone-900 dark:text-stone-50 leading-snug sm:leading-relaxed tracking-tight"
                      >
                        &ldquo;{currentStatement.statement}&rdquo;
                      </blockquote>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Statement Action Controls: Read Aloud & Green Accept Button */}
                <div className="mt-8 pt-5 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                  {/* Read Aloud Button */}
                  <button
                    type="button"
                    onClick={handleToggleReadAloud}
                    disabled={!hasSpeechSupport || isTransitioning}
                    className={`inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl border font-semibold text-sm transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                      isSpeaking
                        ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-400 text-amber-900 dark:text-amber-200 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-stone-100 hover:bg-stone-200/90 dark:bg-stone-800 dark:hover:bg-stone-750 border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    aria-label={
                      isSpeaking
                        ? 'Stop reading pledge statement aloud'
                        : 'Read currently displayed pledge statement aloud'
                    }
                    title={
                      isSpeaking
                        ? 'Stop reading'
                        : 'Read this statement aloud using browser voice'
                    }
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-bounce" />
                        <span className="font-bold">Stop Reading</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5 text-stone-600 dark:text-stone-400 group-hover:text-stone-900" />
                        <span>Read Aloud</span>
                      </>
                    )}
                  </button>

                  {/* Clear Green "Accept" / Check Button */}
                  <motion.button
                    ref={acceptButtonRef}
                    type="button"
                    onClick={handleAcceptStatement}
                    disabled={isTransitioning}
                    whileHover={{ scale: isTransitioning ? 1 : 1.02 }}
                    whileTap={{ scale: isTransitioning ? 1 : 0.98 }}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus:outline-hidden focus:ring-3 focus:ring-emerald-400"
                    aria-label={`Accept Statement ${currentStepIndex + 1}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    </div>
                    <span>
                      {currentStepIndex === PLEDGE_STATEMENTS.length - 1
                        ? 'Accept & Complete Pledge'
                        : 'Accept Statement'}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-0.5 opacity-80" />
                  </motion.button>
                </div>
              </div>
            ) : (
              /* Completion Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="py-4 flex flex-col items-center text-center"
              >
                {/* Prominent Success Badge */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                    <CheckCheck className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                    className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-stone-900 flex items-center justify-center shadow-md font-bold"
                  >
                    <Sparkles className="w-4 h-4 fill-stone-900" />
                  </motion.div>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  <Award className="w-3.5 h-3.5" />
                  <span>Pledge Completed</span>
                </div>

                {/* Required Exact Copy */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-3">
                  Thank you for taking the Not Yet Parent Pledge.
                </h3>

                <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-lg leading-relaxed mb-6 font-medium">
                  Your commitment helps create healthier childhoods and stronger real-world connections.
                </p>

                {/* Summary of Accepted Pledges */}
                <div className="w-full text-left bg-white dark:bg-stone-800/90 rounded-2xl p-5 border border-stone-200 dark:border-stone-700/80 mb-6 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3">
                    Your 2025–2026 Commitments
                  </div>
                  <ul className="space-y-2.5">
                    {PLEDGE_STATEMENTS.map((stmt) => (
                      <li key={stmt.id} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-200">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{stmt.statement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share with Other Parents'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetPledge}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Review Statements</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>Done</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
