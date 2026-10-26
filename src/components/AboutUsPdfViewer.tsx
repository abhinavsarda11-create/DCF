import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Grid,
  FileText,
  CheckCircle,
  Eye,
  Layers,
} from 'lucide-react';
import { ActualPdfSlide } from './ActualPdfSlide';
import { downloadAboutUsPdf } from '../lib/generateAboutUsPdf';
import { useGoldenBurst } from './GoldenSparkles';

interface AboutUsPdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutUsPdfViewer({ isOpen, onClose }: AboutUsPdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'slide' | 'all' | 'grid'>('slide');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);
  const { triggerGoldenBurst } = useGoldenBurst();

  const totalPages = 14;

  const handleDownload = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 30);
    downloadAboutUsPdf();
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3500);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

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
                  Official Presentation PDF
                </span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono text-white">
                  14 Pages
                </span>
              </div>
              <h2 className="text-xs sm:text-base font-bold text-white line-clamp-1">
                Activities 2024-25 Dawn Child Foundation: Shubh Aarambh
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
                All 14 Pages
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
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-amber-200" />
              <span>Print / Save PDF</span>
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
            /* ================= SLIDE BY SLIDE VIEW ================= */
            <div className="w-full max-w-4xl flex flex-col items-center">
              {/* Actual Slide Element */}
              <div className="w-full shadow-2xl rounded-2xl overflow-hidden print:shadow-none">
                <ActualPdfSlide pageNumber={currentPage} />
              </div>

              {/* Navigation Bar below slide */}
              <div className="mt-4 flex items-center justify-between w-full max-w-xl bg-white dark:bg-stone-900 px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm print:hidden">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-100 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                {/* Page Dropdown / Counter */}
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
            /* ================= CONTINUOUS ALL 14 PAGES VIEW ================= */
            <div className="w-full max-w-4xl space-y-8 py-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i + 1}
                  className="shadow-xl rounded-2xl overflow-hidden print:break-after-page print:shadow-none"
                >
                  <div className="bg-amber-200/60 text-amber-900 px-4 py-1 text-[11px] font-bold flex items-center justify-between border-b border-amber-300 print:hidden">
                    <span>PAGE {i + 1} OF 14</span>
                    <button
                      onClick={() => {
                        setCurrentPage(i + 1);
                        setViewMode('slide');
                      }}
                      className="hover:underline text-[10px]"
                    >
                      Open in Single Slide View →
                    </button>
                  </div>
                  <ActualPdfSlide pageNumber={i + 1} />
                </div>
              ))}
            </div>
          ) : (
            /* ================= GRID OVERVIEW VIEW ================= */
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
                  <div className="scale-90 origin-top pointer-events-none rounded-xl overflow-hidden border border-stone-200 aspect-[16/9] flex items-center justify-center bg-[#fcf8ef] p-1 text-[9px] font-bold text-center leading-tight">
                    {i === 0 && '1. Cover: Empowering Parents'}
                    {i === 1 && '2. Vision and Mission'}
                    {i === 2 && '3. Summary (>1000 Parents)'}
                    {i === 3 && '4. Our Work So Far (40 Workshops)'}
                    {i === 4 && '5. PEG Meetings & 100% Ratings'}
                    {i === 5 && '6. Program: Shubh Aarambh'}
                    {i === 6 && '7. Mindful Parenting Modules'}
                    {i === 7 && '8. Knowledge Collaborations'}
                    {i === 8 && '9. Stories from the Field'}
                    {i === 9 && '10. Upcoming Plans (25 Schools)'}
                    {i === 10 && '11. Impact Summary (~700 Parents)'}
                    {i === 11 && '12. Expressing Gratitude'}
                    {i === 12 && '13. Glimpses: Sessions (Part 1)'}
                    {i === 13 && '14. Glimpses: Workshops (Part 2)'}
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
              <strong>Dawn_Child_Foundation_About_Us_Activities_2024-25.pdf</strong> downloaded successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
