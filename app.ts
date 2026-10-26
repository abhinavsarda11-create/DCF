import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateChatbotReply } from './src/lib/chatbotEngine.ts';
import { initDatabase, isDbLive } from './src/db/index.ts';
import {
  createCertificate,
  getCertificateById,
  getCertificateByNumber,
  listCertificates,
} from './src/db/certificates.ts';
import {
  getOrCreateSession,
  saveChatMessage,
  getSessionMessages,
  getSession,
  getChatAnalytics,
  generateSessionId,
} from './src/db/chat.ts';

dotenv.config();

const require = createRequire(import.meta.url);
const authRoutes = require('./backend/src/routes/auth.routes.js');
const pledgeRoutes = require('./backend/src/routes/pledge.routes.js');
const volunteerRoutes = require('./backend/src/routes/volunteer.routes.js');
const donationRoutes = require('./backend/src/routes/donation.routes.js');
const contactRoutes = require('./backend/src/routes/contact.routes.js');
const eventRoutes = require('./backend/src/routes/event.routes.js');
const adminRoutes = require('./backend/src/routes/admin.routes.js');
import documentRoutes from './src/routes/documents.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// System instruction tailored for Dawn Child Foundation & ECCE parenting expertise
const SYSTEM_PROMPT = `You are Dawn Assistant, the compassionate, science-backed AI guide for Dawn Child Foundation (Shubh: Aarambh).
Dawn Child Foundation is an early childhood care and education (ECCE) non-profit based in South Delhi, India.

Your core mission:
1. Empower parents and caregivers with practical, empathetic, and evidence-based early childhood guidance (ages 0-8).
2. Share the foundation's 10-Week "Shubh: Aarambh" curriculum (Mindfulness, Loving Routines, Non-Violent Communication, Sensory Play, Self-Compassion, Respect & Equity).
3. Offer guidance on common parenting struggles: toddler tantrums, aggressive screaming, screen-time regulation, separation anxiety, picky eating, bed routines, and intergenerational stress.
4. Inform users about foundation activities: 10 South Delhi MCD primary schools (Chirag Dilli, Hauz Rani, Malviya Nagar), 700+ parents trained, 100% PEG satisfaction ratings, 80G tax exemptions (DEL-80G/2023-24/A-1082), volunteering, and downloadable documentation.
5. Promote the Foundation's official 'Not Yet' Parent Pledge (2025–2026): Delaying smartphones until the end of Class 9, no social media until age 16, encouraging unsupervised device-free play, and supporting phone-free learning spaces.
6. Provide actionable suggestions whenever possible (e.g. taking the pledge, donating, exploring the 7 parenting pillars, volunteering, or reading documentation).

Tone and Style:
- Warm, non-judgmental, reassuring, culturally respectful of Indian family dynamics.
- Concise, readable paragraphs with bullet points for key steps when offering parenting advice.
- Avoid robotic jargon; speak like a caring child psychologist or trusted community mentor.`;

export async function buildApp() {
  await initDatabase();

  // Optional MongoDB for pledge / volunteer / donation / contact routes
  if (process.env.MONGODB_URI) {
    const { connectDB } = require('./backend/src/config/db.js');
    await connectDB();
  }

  const app = express();
  app.use(express.json());

  // Initialize Gemini client as fallback when Grok API key is not present or rate-limited
  let geminiClient: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // ==========================================
  // 1. CHATBOT CONVERSATION APIS (WITH DATABASE PERSISTENCE)
  // ==========================================

  // Create new chat session
  app.post('/api/chat/session', async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      const session = await getOrCreateSession(null, userId);
      res.status(201).json({
        success: true,
        sessionId: session.session_id,
        session,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get chat session metadata
  app.get('/api/chat/sessions/:sessionId', async (req: Request, res: Response) => {
    try {
      const session = await getSession(req.params.sessionId);
      if (!session) {
        res.status(404).json({ success: false, error: 'Chat session not found' });
        return;
      }
      res.json({ success: true, session });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get all messages for a chat session
  app.get('/api/chat/sessions/:sessionId/messages', async (req: Request, res: Response) => {
    try {
      const messages = await getSessionMessages(req.params.sessionId);
      res.json({ success: true, count: messages.length, messages });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get chat analytics for administrative review
  app.get('/api/chat/analytics', async (_req: Request, res: Response) => {
    try {
      const analytics = await getChatAnalytics();
      res.json({ success: true, analytics });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route: Chatbot with persistent session & multi-tier AI inference
  app.post('/api/chat', async (req: Request, res: Response) => {
    const { message, history, sessionId: incomingSessionId, userId } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    // 1. Establish session & save user message
    const activeSession = await getOrCreateSession(incomingSessionId, userId);
    const activeSessionId = activeSession.session_id;

    await saveChatMessage(activeSessionId, 'user', message);

    const groqKey = process.env.GROQ_API_KEY || (process.env.GROK_API_KEY?.startsWith('gsk_') ? process.env.GROK_API_KEY : undefined);
    const grokKey = process.env.GROK_API_KEY && !process.env.GROK_API_KEY.startsWith('gsk_') ? process.env.GROK_API_KEY : process.env.XAI_API_KEY;
    const grokBaseUrl = process.env.GROK_BASE_URL || 'https://api.x.ai/v1';
    const grokModel = process.env.GROK_MODEL || 'grok-beta';

    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history)
        ? history.slice(-6).map((h: any) => ({
            role: h.sender === 'user' ? 'user' : 'assistant',
            content: h.text,
          }))
        : []),
      { role: 'user', content: message },
    ];

    // Helper to save assistant response and reply
    const sendAssistantReply = async (replyText: string, suggestedActions?: any[], source?: string, modelUsed?: string) => {
      await saveChatMessage(activeSessionId, 'assistant', replyText);
      res.json({
        text: replyText,
        sessionId: activeSessionId,
        suggestedActions: suggestedActions || [],
        source,
        modelUsed,
      });
    };

    // 1. Attempt Groq API (Ultra-Fast Free Tier Inference with user's gsk_ key)
    if (groqKey) {
      const groqModels = [
        process.env.GROQ_MODEL,
        'openai/gpt-oss-120b',
        'openai/gpt-oss-20b',
        'qwen/qwen3.8-27b',
      ].filter(Boolean) as string[];

      for (const model of groqModels) {
        try {
          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model,
              messages: chatMessages,
              temperature: 0.7,
              max_tokens: 650,
            }),
          });

          if (groqRes.ok) {
            const data = (await groqRes.json()) as any;
            const replyText = data.choices?.[0]?.message?.content;
            if (replyText) {
              const localFallback = generateChatbotReply(message);
              await sendAssistantReply(replyText, localFallback.suggestedActions, 'groq-grok', model);
              return;
            }
          } else {
            console.warn(`Groq API model ${model} returned status:`, groqRes.status);
          }
        } catch (groqErr) {
          console.warn(`Error connecting to Groq API with model ${model}:`, groqErr);
        }
      }
    }

    // 2. Attempt xAI Grok API (if separate xAI key is provided)
    if (grokKey) {
      try {
        const grokRes = await fetch(`${grokBaseUrl.replace(/\/+$/, '')}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${grokKey}`,
          },
          body: JSON.stringify({
            model: grokModel,
            messages: chatMessages,
            temperature: 0.7,
            max_tokens: 600,
          }),
        });

        if (grokRes.ok) {
          const data = (await grokRes.json()) as any;
          const replyText = data.choices?.[0]?.message?.content;
          if (replyText) {
            const localFallback = generateChatbotReply(message);
            await sendAssistantReply(replyText, localFallback.suggestedActions, 'grok');
            return;
          }
        } else {
          console.warn('Grok API responded with status:', grokRes.status, await grokRes.text().catch(() => ''));
        }
      } catch (grokErr) {
        console.warn('Error connecting to Grok API, falling back to backup engine:', grokErr);
      }
    }

    // 3. High-Fidelity AI Fallback Engine
    if (geminiClient) {
      try {
        const formattedHistory = Array.isArray(history)
          ? history.slice(-6).map((h: any) => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')
          : '';

        const fullPrompt = `${SYSTEM_PROMPT}\n\nRecent Conversation:\n${formattedHistory}\n\nUser: ${message}\nAssistant:`;

        let replyText: string | undefined;
        try {
          const resLite = await geminiClient.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: fullPrompt,
          });
          replyText = resLite.text;
        } catch {
          const resFlash = await geminiClient.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: fullPrompt,
          });
          replyText = resFlash.text;
        }

        if (replyText) {
          const localFallback = generateChatbotReply(message);
          await sendAssistantReply(replyText, localFallback.suggestedActions, 'grok-engine');
          return;
        }
      } catch (geminiErr) {
        console.warn('AI fallback call failed, using local knowledge base:', geminiErr);
      }
    }

    // 4. Fallback to Local Knowledge Base Engine
    const localResult = generateChatbotReply(message);
    await sendAssistantReply(localResult.text, localResult.suggestedActions, 'local');
  });

  // ==========================================
  // 2. DIGITAL CERTIFICATES DATABASE APIS
  // ==========================================

  // Save a newly generated certificate
  app.post('/api/certificates', async (req: Request, res: Response) => {
    try {
      const {
        donorName,
        donorEmail,
        donationAmount,
        donationId,
        transactionId,
        certificateNumber,
        pdfReference,
        issuedAt,
      } = req.body;

      if (!donorName || typeof donorName !== 'string' || !donorName.trim()) {
        res.status(400).json({ success: false, error: 'Donor name is required' });
        return;
      }

      if (!donorEmail || typeof donorEmail !== 'string' || !donorEmail.includes('@')) {
        res.status(400).json({ success: false, error: 'Valid donor email is required' });
        return;
      }

      const amountNum = Number(donationAmount);
      if (isNaN(amountNum) || amountNum <= 0) {
        res.status(400).json({ success: false, error: 'Valid donation amount greater than 0 is required' });
        return;
      }

      const cert = await createCertificate({
        donor_name: donorName,
        donor_email: donorEmail,
        donation_amount: amountNum,
        donation_id: donationId || transactionId || null,
        pdf_reference: pdfReference || null,
        certificate_number: certificateNumber || undefined,
        issued_at: issuedAt || undefined,
      });

      res.status(201).json({
        success: true,
        message: 'Certificate successfully persisted in database',
        certificate: cert,
      });
    } catch (err: any) {
      console.error('Error saving certificate:', err);
      res.status(500).json({ success: false, error: err.message || 'Internal server error' });
    }
  });

  // List certificates with pagination (Admin/Portal)
  app.get('/api/certificates', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 50;
      const offset = parseInt(req.query.offset as string, 10) || 0;
      const data = await listCertificates(limit, offset);
      res.json({ success: true, ...data });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get certificate by ID
  app.get('/api/certificates/:id', async (req: Request, res: Response) => {
    try {
      const cert = await getCertificateById(req.params.id);
      if (!cert) {
        res.status(404).json({ success: false, error: 'Certificate not found' });
        return;
      }
      res.json({ success: true, certificate: cert });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get certificate by unique Certificate Number
  app.get('/api/certificates/number/:certificateNumber', async (req: Request, res: Response) => {
    try {
      const cert = await getCertificateByNumber(req.params.certificateNumber);
      if (!cert) {
        res.status(404).json({ success: false, error: 'Certificate not found with this number' });
        return;
      }
      res.json({ success: true, certificate: cert });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Mount Dedicated Backend Routes
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'online',
      service: 'Dawn Child Foundation API',
      database: isDbLive() ? 'postgresql-connected' : 'resilient-in-memory',
      timestamp: new Date().toISOString(),
      routes: [
        '/api/certificates',
        '/api/chat',
        '/api/chat/session',
        '/api/chat/sessions/:sessionId/messages',
        '/api/chat/analytics',
        '/api/pledge',
        '/api/volunteer',
        '/api/donation',
        '/api/event',
        '/api/contact',
        '/api/auth',
        '/api/admin',
        '/api/documents',
        '/api/documents/upload',
      ],
    });
  });

  // Serve uploaded public documents directly from public/assets/documents
  app.use(
    '/assets/documents',
    express.static(path.resolve(__dirname, 'public', 'assets', 'documents'))
  );

  app.use('/api/documents', documentRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/pledge', pledgeRoutes);
  app.use('/api/volunteer', volunteerRoutes);
  app.use('/api/donation', donationRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/event', eventRoutes);
  app.use('/api/admin', adminRoutes);

  return app;
}
