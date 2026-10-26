import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Award,
  Sparkles,
  BookOpen,
  Calendar,
  Search,
  Filter,
  Layers,
  Camera,
  CheckCircle2,
  TrendingUp,
  School,
  HeartHandshake,
  Compass,
} from 'lucide-react';
import { Logo } from './Logo';
import { DOCUMENTATION_ITEMS, DocumentationItem } from '../data/documentationItems';
import { OriginalPdfViewer } from './OriginalPdfViewer';
import { useGoldenBurst } from './GoldenSparkles';
import { UploadCloud } from 'lucide-react';

interface DocumentationPageProps {
  onBack: () => void;
  onOpenUpload?: () => void;
}

export function DocumentationPage({ onBack, onOpenUpload }: DocumentationPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeViewerDoc, setActiveViewerDoc] = useState<DocumentationItem | null>(null);
  const { triggerGoldenBurst } = useGoldenBurst();

  const categories = [
    'All',
    'Overview',
    'Implementation',
    'Impact',
    'Evidence',
    'Feedback',
    'Reflections',
    'Curriculum',
  ];

  const filteredDocs = DOCUMENTATION_ITEMS.filter((doc) => {
    const matchesCategory =
      selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDoc = (doc: DocumentationItem, e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 20);
    setActiveViewerDoc(doc);
  };

  // Helper icon for each category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Overview':
        return <BookOpen className="w-5 h-5 text-amber-500" />;
      case 'Implementation':
        return <Compass className="w-5 h-5 text-orange-500" />;
      case 'Impact':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'Evidence':
        return <Camera className="w-5 h-5 text-purple-500" />;
      case 'Feedback':
        return <School className="w-5 h-5 text-blue-500" />;
      case 'Reflections':
        return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'Curriculum':
        return <Layers className="w-5 h-5 text-amber-600" />;
      default:
        return <FileText className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-[85vh] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col justify-start">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 mb-8 sm:mb-10">
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-[#ea580c] dark:hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </motion.button>

        <div className="flex items-center gap-4">
          {onOpenUpload && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenUpload}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-[#f25c27] text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload PDF</span>
            </motion.button>
          )}

          <div onClick={onBack} className="cursor-pointer">
            <Logo size="sm" />
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/70 border border-amber-300/60 dark:border-amber-700/60 text-[#ea580c] dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Official Reports & Publications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
          Foundation Documentation
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
          Access official client documents and presentation files. All documents are loaded and rendered directly from their original PDF source files.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white/80 dark:bg-stone-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#ebdcc9] dark:border-stone-800 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 mr-1 hidden lg:inline-flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ea580c] to-[#f59e0b] text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px] sm:min-w-[260px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports or keywords..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#ea580c]/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Documentation Cards Grid */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8">
          <FileText className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            No matching documents found
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Try adjusting your search terms or selecting another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={(e) => handleOpenDoc(doc, e)}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle amber gradient sweep on hover */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-amber-400/10 to-transparent rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

              <div>
                {/* Card Top Meta & Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-200 dark:border-amber-800">
                    {getCategoryIcon(doc.category)}
                    <span>{doc.badge}</span>
                  </span>

                  <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                    {doc.period} • {doc.pagesCount} Pages
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white leading-tight group-hover:text-[#ea580c] dark:group-hover:text-amber-400 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#ea580c] dark:text-amber-400 mt-1 line-clamp-1">
                  {doc.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-3 leading-relaxed line-clamp-3">
                  {doc.description}
                </p>

                {/* Highlights List */}
                <div className="mt-4 pt-3.5 border-t border-stone-100 dark:border-stone-800/80 space-y-1.5">
                  {doc.keyHighlights.slice(0, 3).map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => handleOpenDoc(doc, e)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f59e0b] hover:from-[#c2410c] hover:to-[#ea580c] text-white text-xs font-bold transition-all shadow-xs cursor-pointer group-hover:shadow-[0_0_12px_rgba(234,88,12,0.35)]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Document</span>
                </button>

                {/* Direct Static PDF File Download (byte-for-byte original file) */}
                <a
                  href={doc.file}
                  download={doc.pdfFilename}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerGoldenBurst(e.clientX, e.clientY, 25);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer text-center"
                >
                  <Download className="w-3.5 h-3.5 text-[#ea580c] dark:text-amber-400" />
                  <span>Download PDF</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= EXACT ORIGINAL PDF VIEWER ================= */}
      {activeViewerDoc && (
        <OriginalPdfViewer
          file={activeViewerDoc.file}
          title={activeViewerDoc.title}
          pdfFilename={activeViewerDoc.pdfFilename}
          badge={activeViewerDoc.badge}
          isOpen={!!activeViewerDoc}
          onClose={() => setActiveViewerDoc(null)}
        />
      )}
    </div>
  );
}
