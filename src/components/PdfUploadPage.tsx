import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  FolderOpen,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Tag,
  Clock,
  HardDrive,
  Check,
  Grid,
  List,
} from 'lucide-react';
import { Logo } from './Logo';
import { OriginalPdfViewer } from './OriginalPdfViewer';
import { useGoldenBurst } from './GoldenSparkles';

export interface DocumentRecord {
  filename: string;
  title: string;
  category: string;
  description: string;
  size: number;
  sizeFormatted: string;
  uploadedAt: string;
  url: string;
  downloadUrl: string;
}

interface PdfUploadPageProps {
  onBack: () => void;
  onNavigateHome?: () => void;
}

const CATEGORIES = [
  'All',
  'Curriculum & Education',
  'Impact & Assessment',
  '80G & Legal Compliance',
  'Parenting Guides & Toolkit',
  'School & Community Feedback',
  'Volunteer Documentation',
  'General',
];

export function PdfUploadPage({ onBack, onNavigateHome }: PdfUploadPageProps) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Curriculum & Education');
  const [description, setDescription] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // PDF Viewer Modal
  const [activeViewerDoc, setActiveViewerDoc] = useState<DocumentRecord | null>(null);
  const [copiedFilename, setCopiedFilename] = useState<string | null>(null);
  const [deleteConfirmDoc, setDeleteConfirmDoc] = useState<DocumentRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Drag and drop state
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { triggerGoldenBurst } = useGoldenBurst();

  // Load documents from backend
  const fetchDocuments = async () => {
    setIsLoadingDocs(true);
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      if (data.success && Array.isArray(data.documents)) {
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error('Failed to load documents:', err);
    } finally {
      setIsLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file selection
  const handleFileChange = (file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setFeedbackMessage({
        type: 'error',
        text: 'Please select a valid PDF file (.pdf). Other formats are not supported.',
      });
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setFeedbackMessage({
        type: 'error',
        text: `File exceeds 30 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB). Please select a smaller PDF.`,
      });
      return;
    }

    setSelectedFile(file);
    setFeedbackMessage(null);

    // Auto-fill title if empty
    if (!title.trim()) {
      const cleanName = file.name
        .replace(/\.pdf$/i, '')
        .replace(/[-_]+/g, ' ')
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      setTitle(cleanName);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Upload handler
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setFeedbackMessage({ type: 'error', text: 'Please select a PDF file to upload.' });
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);
    setFeedbackMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title.trim() || selectedFile.name);
      formData.append('category', category);
      formData.append('description', description.trim());

      setUploadProgress(50);

      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(85);

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload PDF');
      }

      setUploadProgress(100);
      setFeedbackMessage({
        type: 'success',
        text: `PDF successfully uploaded and saved to public/assets/documents/${data.document.filename}`,
      });

      // Clear input fields
      setSelectedFile(null);
      setTitle('');
      setDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Refresh documents
      await fetchDocuments();
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'An error occurred during PDF upload.',
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Copy direct public URL to clipboard
  const handleCopyLink = (doc: DocumentRecord) => {
    const fullUrl = `${window.location.origin}${doc.url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedFilename(doc.filename);
    setTimeout(() => setCopiedFilename(null), 2500);
  };

  // Delete document
  const handleDeleteDoc = async () => {
    if (!deleteConfirmDoc) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/documents/${encodeURIComponent(deleteConfirmDoc.filename)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete document');
      }

      setFeedbackMessage({
        type: 'success',
        text: `Document "${deleteConfirmDoc.filename}" removed from public/assets/documents.`,
      });

      setDeleteConfirmDoc(null);
      await fetchDocuments();
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err.message || 'Error deleting document.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter documents
  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      doc.title.toLowerCase().includes(query) ||
      doc.filename.toLowerCase().includes(query) ||
      doc.description.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-start">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800 mb-8 sm:mb-10">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-[#ea580c] dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>
          <span className="text-stone-300 dark:text-stone-700">|</span>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Folder: public/assets/documents</span>
          </div>
        </div>

        <div onClick={onNavigateHome || onBack} className="cursor-pointer">
          <Logo />
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Document Vault & PDF Uploader</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-4">
          Upload & Manage PDF Documents
        </h1>
        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
          Upload curriculum guides, 80G tax certificates, annual impact reports, and school assessments.
          All files are stored directly in <code className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded font-mono text-sm">public/assets/documents</code> and immediately accessible for download and preview.
        </p>
      </div>

      {/* Main Grid: Upload Form (Left) & Live Repository (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: Upload Form (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100 dark:border-stone-800">
            <h2 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-amber-500" />
              <span>Upload New PDF</span>
            </h2>
            <span className="text-xs text-stone-400 font-mono">Max 30 MB</span>
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            {/* Drag & Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 scale-[1.01]'
                  : selectedFile
                  ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-stone-300 dark:border-stone-700 hover:border-amber-400 hover:bg-stone-50 dark:hover:bg-stone-800/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mb-3 shadow-inner">
                    <FileText className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 break-all max-w-[260px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="mt-3 text-xs text-stone-400 hover:text-rose-500 underline"
                  >
                    Choose a different PDF
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 shadow-inner group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                    Click to select or drag & drop PDF here
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Accepts standard .pdf files up to 30 MB
                  </p>
                </div>
              )}
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10-Week Shubh: Aarambh Parenting Curriculum"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description / Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
                Brief Description / Summary <span className="text-stone-400 normal-case">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief summary of what this document covers..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all resize-none"
              />
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Uploading to public/assets/documents...</span>
                  <span className="font-mono">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#f25c27] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Feedback Notifications */}
            {feedbackMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 ${
                  feedbackMessage.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
                }`}
              >
                {feedbackMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <span className="flex-1 leading-snug">{feedbackMessage.text}</span>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!selectedFile || isUploading}
              whileHover={{ scale: !selectedFile || isUploading ? 1 : 1.02 }}
              whileTap={{ scale: !selectedFile || isUploading ? 1 : 0.98 }}
              onClick={(e) => {
                if (selectedFile) triggerGoldenBurst(e.clientX, e.clientY, 25);
              }}
              className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                !selectedFile || isUploading
                  ? 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-[#f25c27] text-white hover:shadow-amber-500/25'
              }`}
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving to public/assets/documents...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Save PDF to Repository</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Local Folder Path Info Box */}
          <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 space-y-1">
            <p className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
              <FolderOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Storage Destination:</span>
            </p>
            <p className="font-mono text-[11px] bg-stone-100 dark:bg-stone-800 p-2 rounded-lg break-all">
              ./public/assets/documents/
            </p>
            <p className="text-[11px] text-stone-400">
              Files uploaded here are directly accessible at <code className="text-amber-600 dark:text-amber-400">/assets/documents/&lt;filename&gt;</code> in both dev and production.
            </p>
          </div>
        </div>

        {/* Right Column: Stored Documents Browser (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          {/* Controls Bar: Search, Category Filter, and View Mode */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 shadow-sm border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Stored PDFs in Repository
                </h3>
                <span className="text-xs bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-semibold px-2.5 py-0.5 rounded-full">
                  {documents.length} {documents.length === 1 ? 'file' : 'files'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchDocuments}
                  title="Refresh list"
                  className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingDocs ? 'animate-spin' : ''}`} />
                </button>
                <div className="flex border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-amber-500 text-white'
                        : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                    title="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-amber-500 text-white'
                        : 'text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PDF by title, filename, or category..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Document List / Grid */}
          {isLoadingDocs ? (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800">
              <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
              <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                Scanning public/assets/documents...
              </p>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800">
              <FileText className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
              <p className="text-base font-semibold text-stone-800 dark:text-stone-200">
                No PDF documents match your search
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                {searchQuery || selectedCategory !== 'All'
                  ? 'Try adjusting your search terms or filter category.'
                  : 'Upload your first PDF document using the form on the left!'}
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => (
                <motion.div
                  key={doc.filename}
                  layout
                  className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-amber-400/80 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Category tag and File size */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 truncate max-w-[170px]">
                        {doc.category}
                      </span>
                      <span className="text-xs font-mono text-stone-400 dark:text-stone-500 shrink-0">
                        {doc.sizeFormatted}
                      </span>
                    </div>

                    {/* Document Title & Icon */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-snug line-clamp-2">
                          {doc.title}
                        </h4>
                        <p className="text-xs font-mono text-stone-400 truncate mt-0.5" title={doc.filename}>
                          {doc.filename}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {doc.description && (
                      <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-2 leading-relaxed">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* View PDF Modal */}
                      <button
                        type="button"
                        onClick={() => setActiveViewerDoc(doc)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                        title="View PDF document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      {/* Download */}
                      <a
                        href={doc.downloadUrl}
                        download={doc.filename}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>

                      {/* Copy Link */}
                      <button
                        type="button"
                        onClick={() => handleCopyLink(doc)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Copy direct link"
                      >
                        {copiedFilename === doc.filename ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Open New Tab */}
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Delete action */}
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmDoc(doc)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs divide-y divide-stone-100 dark:divide-stone-800">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.filename}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-snug">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-stone-400 truncate mt-0.5">{doc.filename}</p>
                      <div className="flex items-center gap-3 text-xs text-stone-400 mt-1">
                        <span>{doc.sizeFormatted}</span>
                        <span>•</span>
                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => setActiveViewerDoc(doc)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <a
                      href={doc.downloadUrl}
                      download={doc.filename}
                      className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyLink(doc)}
                      className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      title="Copy Link"
                    >
                      {copiedFilename === doc.filename ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmDoc(doc)}
                      className="p-2 rounded-xl text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-2">
                Delete PDF Document?
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 leading-relaxed">
                Are you sure you want to delete <span className="font-mono font-semibold text-stone-800 dark:text-stone-200">"{deleteConfirmDoc.filename}"</span> from <code className="text-xs bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">public/assets/documents</code>? This cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmDoc(null)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteDoc}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete File</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Integrated PDF Viewer Modal */}
      {activeViewerDoc && (
        <OriginalPdfViewer
          isOpen={!!activeViewerDoc}
          onClose={() => setActiveViewerDoc(null)}
          file={activeViewerDoc.url}
          title={activeViewerDoc.title}
          pdfFilename={activeViewerDoc.filename}
          badge={activeViewerDoc.category}
        />
      )}
    </div>
  );
}
