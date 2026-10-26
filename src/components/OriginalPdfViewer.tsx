import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  X,
  FileText,
  ExternalLink,
  Layers,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

interface OriginalPdfViewerProps {
  file: string; // Path to original PDF, e.g. "/documents/about-us.pdf"
  title: string;
  pdfFilename: string;
  badge?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function OriginalPdfViewer({
  file,
  title,
  pdfFilename,
  badge = 'Official Document',
  isOpen,
  onClose,
}: OriginalPdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'native'>('canvas');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [renderAllPages, setRenderAllPages] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);
  const pdfDocRef = useRef<any>(null);

  // Reset states when file changes
  useEffect(() => {
    if (!isOpen) return;
    setCurrentPage(1);
    setScale(1.2);
    setIsLoading(true);
    setError(null);

    let isCancelled = false;

    async function loadPdf() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch original byte-for-byte PDF file directly from the URL
        const loadingTask = pdfjsLib.getDocument({
          url: file,
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = doc;
        setNumPages(doc.numPages);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error loading PDF:', err);
        if (!isCancelled) {
          setError(err.message || 'Failed to load original PDF file.');
          setIsLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [file, isOpen]);

  // Render single page onto canvas
  useEffect(() => {
    if (!pdfDocRef.current || !canvasRef.current || isLoading || renderAllPages || viewMode !== 'canvas') {
      return;
    }

    let isCancelled = false;

    async function renderPage() {
      try {
        const page = await pdfDocRef.current.getPage(currentPage);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Cancel previous in-flight render task if any
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const viewport = page.getViewport({ scale });
        const pixelRatio = window.devicePixelRatio || 1;

        // Set display dimensions (css pixels)
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        // Set actual canvas drawing buffer size (retina resolution)
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Page render error:', err);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [currentPage, scale, isLoading, renderAllPages, viewMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, numPages, isFullscreen]);

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1.2);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md overflow-hidden ${
        isFullscreen ? 'p-0' : 'p-1 sm:p-4 lg:p-6'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className={`w-full flex flex-col bg-[#1e1e1e] text-white overflow-hidden shadow-2xl border border-stone-700 ${
          isFullscreen
            ? 'h-screen rounded-none'
            : 'max-w-6xl h-[95vh] rounded-2xl sm:rounded-3xl'
        }`}
      >
        {/* ================= TOP CONTROL BAR ================= */}
        <div className="bg-[#2a2a2a] px-3 sm:px-6 py-2.5 flex items-center justify-between border-b border-stone-700 shrink-0 gap-2">
          {/* Left Title & Status */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer mr-1"
              title="Back to Documents"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-orange-600/30 text-[#ea580c] flex items-center justify-center font-bold text-xs shrink-0">
              <FileText className="w-4 h-4 text-[#ea580c]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/80 shrink-0">
                  {badge}
                </span>
                <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
                  Original Source: {file}
                </span>
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-white truncate max-w-sm sm:max-w-md">
                {title}
              </h2>
            </div>
          </div>

          {/* Center / Right Toolbar Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View Mode Toggle: Canvas vs Native Browser */}
            <div className="hidden sm:flex bg-black/40 p-0.5 rounded-xl border border-stone-700 text-xs">
              <button
                onClick={() => setViewMode('canvas')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'canvas'
                    ? 'bg-stone-700 text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Render with Mozilla PDF.js"
              >
                PDF.js Renderer
              </button>
              <button
                onClick={() => setViewMode('native')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  viewMode === 'native'
                    ? 'bg-stone-700 text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
                title="Render using native browser PDF viewer"
              >
                Native Viewer
              </button>
            </div>

            {/* Zoom Controls (Active in Canvas mode) */}
            {viewMode === 'canvas' && (
              <div className="hidden md:flex items-center bg-black/40 rounded-xl border border-stone-700 px-1 py-0.5">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 0.5}
                  className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 cursor-pointer"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-2 text-stone-300 min-w-[45px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= 3.0}
                  className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 cursor-pointer"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 ml-0.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Open in New Browser Tab */}
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open Original PDF in New Browser Tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline">Open in Tab</span>
            </a>

            {/* Direct Download Button (Byte-for-byte static file download) */}
            <a
              href={file}
              download={pdfFilename}
              className="px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f59e0b] hover:brightness-110 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              title="Download exact original PDF file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Original PDF</span>
              <span className="sm:hidden">Download</span>
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/20 text-stone-400 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close PDF Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= VIEWER BODY ================= */}
        <div className="flex-1 overflow-auto bg-[#141414] p-3 sm:p-6 flex flex-col items-center justify-start relative">
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#141414]/90 gap-3">
              <Loader2 className="w-8 h-8 text-[#ea580c] animate-spin" />
              <p className="text-xs sm:text-sm font-semibold text-stone-300">
                Loading original PDF file ({file})...
              </p>
            </div>
          )}

          {error && (
            <div className="m-auto max-w-md bg-stone-900 p-6 rounded-2xl border border-red-500/40 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
              <h3 className="text-base font-bold text-white">
                Unable to render PDF via canvas
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">{error}</p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setViewMode('native')}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Switch to Native Browser Viewer
                </button>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
                >
                  Open Direct Link
                </a>
              </div>
            </div>
          )}

          {!isLoading && !error && viewMode === 'canvas' && (
            /* PDF.js Canvas Rendering of Original PDF */
            <div className="flex flex-col items-center justify-center my-auto transition-transform">
              <div className="shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-stone-800 rounded-sm overflow-hidden bg-white">
                <canvas ref={canvasRef} className="block max-w-full" />
              </div>
            </div>
          )}

          {!isLoading && !error && viewMode === 'native' && (
            /* Native Browser Embed (iframe loading original byte-for-byte file) */
            <div className="w-full h-full flex-1 rounded-xl overflow-hidden border border-stone-800 bg-stone-950">
              <iframe
                src={`${file}#toolbar=1&navpanes=1`}
                title={title}
                className="w-full h-full border-none"
              />
            </div>
          )}
        </div>

        {/* ================= BOTTOM NAVIGATION TOOLBAR ================= */}
        {viewMode === 'canvas' && !isLoading && !error && numPages > 0 && (
          <div className="bg-[#242424] px-4 py-2.5 border-t border-stone-700 flex items-center justify-between shrink-0 gap-3 text-xs">
            {/* Left: Previous page */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Center: Page Jump and Counter */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium">Page</span>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="bg-stone-800 border border-stone-600 rounded-lg px-2.5 py-1 text-white font-mono text-xs font-bold cursor-pointer focus:outline-hidden focus:border-amber-400"
              >
                {Array.from({ length: numPages }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <span className="text-stone-400 font-medium">of {numPages}</span>
            </div>

            {/* Right: Next page */}
            <button
              onClick={handleNextPage}
              disabled={currentPage >= numPages}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
