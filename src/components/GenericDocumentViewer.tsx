import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  FileText,
  CheckCircle,
  Quote,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { DocumentationItem } from '../data/documentationItems';
import { downloadDocumentPdf } from '../lib/generateDocPdfs';
import { useGoldenBurst } from './GoldenSparkles';

interface GenericDocumentViewerProps {
  docItem: DocumentationItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GenericDocumentViewer({
  docItem,
  isOpen,
  onClose,
}: GenericDocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'slide' | 'all' | 'grid'>('slide');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);
  const { triggerGoldenBurst } = useGoldenBurst();

  // Reset page when docItem changes
  useEffect(() => {
    setCurrentPage(1);
    setViewMode('slide');
  }, [docItem?.id]);

  if (!isOpen || !docItem) return null;

  const totalPages = docItem.slides.length + 1; // 1 cover + N content slides

  const handleDownload = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 30);
    downloadDocumentPdf(docItem);
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3500);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const renderSlideContent = (pageNum: number) => {
    // Page 1 is the Cover Slide
    if (pageNum === 1) {
      return (
        <div className="w-full bg-[#fdfaf3] text-stone-900 rounded-2xl p-6 sm:p-10 border border-amber-200/80 flex flex-col justify-between aspect-[16/9] min-h-[460px] sm:min-h-[560px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-amber-900/10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                DC
              </div>
              <div>
                <span className="font-hindi text-base sm:text-lg font-bold text-[#c2410c]">
                  शुभ: आरम्भ
                </span>
                <span className="font-serif italic font-bold text-[#c2410c] text-sm ml-1.5">
                  Dawn Child
                </span>
                <p className="text-[10px] text-stone-500 uppercase tracking-wide">
                  Early Childhood Care & Education
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              {docItem.badge}
            </span>
          </div>

          {/* Main Cover Body */}
          <div className="my-auto py-4 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-[#ea580c] text-xs font-bold uppercase tracking-wider">
              {docItem.period}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 leading-tight">
              {docItem.title}
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#ea580c] leading-snug">
              {docItem.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              {docItem.description}
            </p>

            {/* Key Highlights list on cover */}
            <div className="bg-white/80 dark:bg-stone-800/60 p-4 rounded-2xl border border-amber-200/60 dark:border-stone-700/60 mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 block mb-2">
                Executive Highlights:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                {docItem.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs text-stone-500">
            <span>Dawn Child Foundation • New Delhi</span>
            <span className="font-mono">Cover • Page 1 of {totalPages}</span>
          </div>
        </div>
      );
    }

    // Page N is docItem.slides[pageNum - 2]
    const slide = docItem.slides[pageNum - 2];
    if (!slide) return null;

    return (
      <div className="w-full bg-[#fdfaf3] text-stone-900 rounded-2xl p-6 sm:p-10 border border-amber-200/80 flex flex-col justify-between aspect-[16/9] min-h-[460px] sm:min-h-[560px]">
        {/* Slide Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c]">
                {slide.badge || docItem.title}
              </span>
              <span className="text-stone-400 text-xs">•</span>
              <span className="text-xs text-stone-500">{docItem.period}</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-stone-900 mt-0.5 leading-snug">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-xs sm:text-sm text-stone-600 font-medium">
                {slide.subtitle}
              </p>
            )}
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-stone-700 block">
              Dawn Child Foundation
            </span>
            <span className="text-[10px] text-stone-500">
              Activities 2024-25
            </span>
          </div>
        </div>

        {/* Slide Body */}
        <div className="my-auto py-3 space-y-4 overflow-y-auto max-h-[380px]">
          {slide.sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-2">
              {sec.heading && (
                <h3 className="text-sm sm:text-base font-bold text-[#c2410c]">
                  {sec.heading}
                </h3>
              )}

              {sec.text && (
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {sec.text}
                </p>
              )}

              {sec.highlightBox && (
                <div className="bg-amber-100/70 p-3.5 rounded-xl border border-amber-300 text-xs sm:text-sm font-semibold text-amber-900">
                  {sec.highlightBox}
                </div>
              )}

              {sec.bullets && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {sec.bullets.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-stone-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] mt-2 shrink-0" />
                      <span className="text-stone-800 leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.quote && (
                <div className="bg-orange-50/80 p-4 rounded-xl border border-orange-200 flex items-start gap-3 my-2">
                  <Quote className="w-5 h-5 text-[#ea580c] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm italic text-stone-800 leading-relaxed">
                      "{sec.quote.text}"
                    </p>
                    <div className="mt-1.5 text-[11px] font-bold text-[#c2410c]">
                      {sec.quote.author}{' '}
                      <span className="text-stone-500 font-normal">
                        ({sec.quote.role})
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Slide Footer */}
        <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>{docItem.title}</span>
          <span className="font-mono">
            Page {pageNum} of {totalPages}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-1 sm:p-4 lg:p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="w-full max-w-6xl h-[95vh] flex flex-col bg-[#fbf5eb] dark:bg-stone-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-300/80 dark:border-stone-700 overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#f59e0b] text-white px-3 sm:px-6 py-3 flex items-center justify-between gap-2 shadow-md shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-100 font-bold shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-200">
                  {docItem.badge}
                </span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono text-white">
                  {totalPages} Pages
                </span>
              </div>
              <h2 className="text-xs sm:text-base font-bold text-white line-clamp-1">
                {docItem.title}
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex bg-black/20 p-0.5 rounded-xl border border-white/20">
              <button
                onClick={() => setViewMode('slide')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'slide'
                    ? 'bg-white text-[#ea580c] shadow-xs'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                Slide View
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-white text-[#ea580c] shadow-xs'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                All Pages
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#ea580c] shadow-xs'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                Grid
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer hidden md:flex"
              title="Print Document"
            >
              <Printer className="w-4 h-4 text-amber-200" />
              <span>Print</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-white text-[#ea580c] hover:bg-amber-50 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea580c]" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </motion.button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Close PDF viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-stone-200/60 dark:bg-stone-950/80 p-2 sm:p-5 flex flex-col items-center justify-start print:p-0 print:bg-white">
          {viewMode === 'slide' ? (
            /* ================= SLIDE VIEW ================= */
            <div className="w-full max-w-4xl flex flex-col items-center">
              <div className="w-full shadow-2xl rounded-2xl overflow-hidden print:shadow-none">
                {renderSlideContent(currentPage)}
              </div>

              {/* Navigation below slide */}
              <div className="mt-4 flex items-center justify-between w-full max-w-xl bg-white dark:bg-stone-900 px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm print:hidden">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-500">Page</span>
                  <select
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    className="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-bold text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 cursor-pointer"
                  >
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} of {totalPages}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : viewMode === 'all' ? (
            /* ================= ALL PAGES VIEW ================= */
            <div className="w-full max-w-4xl space-y-8 py-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i + 1}
                  className="shadow-xl rounded-2xl overflow-hidden print:break-after-page print:shadow-none"
                >
                  <div className="bg-amber-200/60 text-amber-900 px-4 py-1 text-[11px] font-bold flex items-center justify-between border-b border-amber-300 print:hidden">
                    <span>PAGE {i + 1} OF {totalPages}</span>
                    <button
                      onClick={() => {
                        setCurrentPage(i + 1);
                        setViewMode('slide');
                      }}
                      className="hover:underline text-[10px]"
                    >
                      Open in Slide View →
                    </button>
                  </div>
                  {renderSlideContent(i + 1)}
                </div>
              ))}
            </div>
          ) : (
            /* ================= GRID OVERVIEW ================= */
            <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    setViewMode('slide');
                  }}
                  className={`bg-white dark:bg-stone-900 rounded-2xl p-2.5 border-2 transition-all cursor-pointer text-left shadow-xs hover:shadow-lg ${
                    currentPage === i + 1
                      ? 'border-[#ea580c] ring-2 ring-[#ea580c]/30'
                      : 'border-stone-200 dark:border-stone-800 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 mb-1.5 px-1">
                    <span>Page {i + 1}</span>
                    <span className="text-[#ea580c] text-[10px]">Open</span>
                  </div>
                  <div className="scale-90 origin-top pointer-events-none rounded-xl overflow-hidden border border-stone-200 aspect-[16/9] flex items-center justify-center bg-[#fdfaf3] p-2 text-[10px] font-bold text-center leading-tight">
                    {i === 0
                      ? `Cover: ${docItem.title}`
                      : docItem.slides[i - 1]?.title || `Page ${i + 1}`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Download Success Toast */}
      <AnimatePresence>
        {downloadSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-300/40 text-xs sm:text-sm font-medium"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>{docItem.pdfFilename}</strong> downloaded successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
