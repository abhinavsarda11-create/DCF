import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Define destination folder in public/assets/documents
const DOCUMENTS_DIR = path.resolve(process.cwd(), 'public', 'assets', 'documents');
const META_FILE = path.join(DOCUMENTS_DIR, '.meta.json');

// Ensure folder exists on startup
try {
  if (!fs.existsSync(DOCUMENTS_DIR)) {
    fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
  }
} catch {
  // Read-only filesystem (e.g. Vercel): uploads are disabled, static PDFs still work
}

// Interface for document metadata
export interface DocumentMeta {
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

// Helper to format file sizes
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper to read metadata store
function readMeta(): Record<string, Partial<DocumentMeta>> {
  try {
    if (fs.existsSync(META_FILE)) {
      const data = fs.readFileSync(META_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('[Documents] Failed to parse meta file, using fallback:', err);
  }
  return {};
}

// Helper to write metadata store
function writeMeta(meta: Record<string, Partial<DocumentMeta>>) {
  try {
    fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Documents] Failed to write meta file:', err);
  }
}

// Human-friendly title generator from filename
function deriveTitle(filename: string): string {
  const base = filename.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ');
  return base
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(DOCUMENTS_DIR)) {
      fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
    }
    cb(null, DOCUMENTS_DIR);
  },
  filename: (_req, file, cb) => {
    // Sanitize filename: replace spaces and weird characters with hyphens
    const originalName = file.originalname;
    const ext = path.extname(originalName) || '.pdf';
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-');

    const timestamp = Date.now();
    // e.g. report-171829102.pdf
    const finalFilename = `${baseName}-${timestamp}${ext.toLowerCase()}`;
    cb(null, finalFilename);
  },
});

// Multer upload middleware with PDF validation
const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 MB max
  },
  fileFilter: (_req, file, cb) => {
    const isPdfExt = path.extname(file.originalname).toLowerCase() === '.pdf';
    const isPdfMime = file.mimetype === 'application/pdf' || file.mimetype === 'application/octet-stream';

    if (isPdfExt || isPdfMime) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files (.pdf) are permitted for upload.'));
    }
  },
});

// ==========================================
// API ROUTES
// ==========================================

/**
 * GET /api/documents
 * List all PDF documents stored in public/assets/documents with metadata
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    if (!fs.existsSync(DOCUMENTS_DIR)) {
      fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
    }

    const files = fs.readdirSync(DOCUMENTS_DIR);
    const metaMap = readMeta();

    const pdfDocuments: DocumentMeta[] = files
      .filter((file) => file.toLowerCase().endsWith('.pdf'))
      .map((file) => {
        const filePath = path.join(DOCUMENTS_DIR, file);
        const stats = fs.statSync(filePath);
        const customMeta = metaMap[file] || {};

        return {
          filename: file,
          title: customMeta.title || deriveTitle(file),
          category: customMeta.category || 'General',
          description:
            customMeta.description ||
            `Official PDF document of Dawn Child Foundation (${formatFileSize(stats.size)}).`,
          size: stats.size,
          sizeFormatted: formatFileSize(stats.size),
          uploadedAt: customMeta.uploadedAt || stats.mtime.toISOString(),
          url: `/assets/documents/${encodeURIComponent(file)}`,
          downloadUrl: `/assets/documents/${encodeURIComponent(file)}`,
        };
      })
      // Sort newest first
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    res.json({
      success: true,
      count: pdfDocuments.length,
      storagePath: 'public/assets/documents',
      documents: pdfDocuments,
    });
  } catch (err: any) {
    console.error('[Documents] Error reading documents directory:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/documents/upload
 * Upload a PDF file to public/assets/documents
 */
router.post('/upload', (req: Request, res: Response) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File size limit exceeded. Maximum allowable size is 30 MB.',
        });
      }
      return res.status(400).json({ success: false, error: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No PDF file was provided in the upload request.',
      });
    }

    try {
      const file = req.file;
      const { title, category, description } = req.body;

      const metaMap = readMeta();
      const docTitle = title && title.trim() ? title.trim() : deriveTitle(file.filename);
      const docCategory = category && category.trim() ? category.trim() : 'General';
      const docDescription = description && description.trim() ? description.trim() : '';

      const docRecord: Partial<DocumentMeta> = {
        title: docTitle,
        category: docCategory,
        description: docDescription,
        uploadedAt: new Date().toISOString(),
      };

      metaMap[file.filename] = docRecord;
      writeMeta(metaMap);

      const createdDoc: DocumentMeta = {
        filename: file.filename,
        title: docTitle,
        category: docCategory,
        description: docDescription,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        uploadedAt: docRecord.uploadedAt!,
        url: `/assets/documents/${encodeURIComponent(file.filename)}`,
        downloadUrl: `/assets/documents/${encodeURIComponent(file.filename)}`,
      };

      console.log(`[Documents] Successfully uploaded PDF: ${file.filename} (${createdDoc.sizeFormatted}) to public/assets/documents`);

      return res.status(201).json({
        success: true,
        message: 'PDF document successfully saved to public/assets/documents',
        document: createdDoc,
      });
    } catch (saveErr: any) {
      console.error('[Documents] Error finalizing upload:', saveErr);
      return res.status(500).json({ success: false, error: saveErr.message });
    }
  });
});

/**
 * DELETE /api/documents/:filename
 * Remove a PDF from public/assets/documents
 */
router.delete('/:filename', (req: Request, res: Response) => {
  try {
    const rawFilename = req.params.filename;
    // Security check: prevent path traversal attacks
    const safeFilename = path.basename(rawFilename);

    if (!safeFilename.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({
        success: false,
        error: 'Only PDF files can be deleted through this endpoint.',
      });
    }

    const targetFilePath = path.join(DOCUMENTS_DIR, safeFilename);

    if (!fs.existsSync(targetFilePath)) {
      return res.status(404).json({
        success: false,
        error: 'The requested document does not exist in public/assets/documents.',
      });
    }

    fs.unlinkSync(targetFilePath);

    // Update metadata map
    const metaMap = readMeta();
    if (metaMap[safeFilename]) {
      delete metaMap[safeFilename];
      writeMeta(metaMap);
    }

    console.log(`[Documents] Deleted PDF: ${safeFilename} from public/assets/documents`);

    res.json({
      success: true,
      message: `Document "${safeFilename}" deleted successfully from public/assets/documents.`,
    });
  } catch (err: any) {
    console.error('[Documents] Error deleting document:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
