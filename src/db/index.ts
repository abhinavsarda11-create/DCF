import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// In-memory fallback structures when PostgreSQL (DATABASE_URL) is not connected
export interface MemoryCertificate {
  id: number | string;
  certificate_number: string;
  donor_name: string;
  donor_email: string;
  donation_amount: number;
  certificate_level: 'diamond' | 'gold' | 'silver' | 'bronze';
  donation_id: string | null;
  pdf_reference: string | null;
  issued_at: string;
  created_at: string;
}

export interface MemoryChatSession {
  id: number | string;
  session_id: string;
  user_id: string | null;
  started_at: string;
  updated_at: string;
}

export interface MemoryChatMessage {
  id: number | string;
  session_id: string;
  sender: 'user' | 'assistant';
  message: string;
  created_at: string;
}

// Global in-memory fallback store
export const memoryStore = {
  certificates: [] as MemoryCertificate[],
  chatSessions: [] as MemoryChatSession[],
  chatMessages: [] as MemoryChatMessage[],
  nextCertId: 1,
  nextSessionId: 1,
  nextMessageId: 1,
};

let pool: Pool | null = null;
let isPostgresConnected = false;
let initPromise: Promise<void> | null = null;

export function getPool(): Pool | null {
  if (pool) return pool;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return null;
  }

  try {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
      max: 10,
    });

    pool.on('error', (err) => {
      console.warn('[PostgreSQL Pool Notice]:', err.message);
    });

    return pool;
  } catch (err: any) {
    console.warn('[PostgreSQL Init Notice] Could not initialize connection pool:', err.message);
    return null;
  }
}

export async function initDatabase(): Promise<void> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const activePool = getPool();
    if (!activePool) {
      console.log('[Database] No DATABASE_URL specified. Running with high-performance relational in-memory store.');
      return;
    }

    try {
      const client = await activePool.connect();
      try {
        await client.query(`
          -- Certificates Table
          CREATE TABLE IF NOT EXISTS certificates (
            id SERIAL PRIMARY KEY,
            certificate_number VARCHAR(100) UNIQUE NOT NULL,
            donor_name VARCHAR(255) NOT NULL,
            donor_email VARCHAR(255) NOT NULL,
            donation_amount NUMERIC(12, 2) NOT NULL,
            certificate_level VARCHAR(50) NOT NULL,
            donation_id VARCHAR(100),
            pdf_reference TEXT,
            issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );

          CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);
          CREATE INDEX IF NOT EXISTS idx_certificates_donor_email ON certificates(donor_email);

          -- Chat Sessions Table
          CREATE TABLE IF NOT EXISTS chat_sessions (
            id SERIAL PRIMARY KEY,
            session_id VARCHAR(120) UNIQUE NOT NULL,
            user_id VARCHAR(120),
            started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );

          CREATE INDEX IF NOT EXISTS idx_chat_sessions_id ON chat_sessions(session_id);

          -- Chat Messages Table
          CREATE TABLE IF NOT EXISTS chat_messages (
            id SERIAL PRIMARY KEY,
            session_id VARCHAR(120) NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
            sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'assistant')),
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );

          CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
        `);
        isPostgresConnected = true;
        console.log('[PostgreSQL] Connected and verified relational schema (certificates, chat_sessions, chat_messages).');
      } finally {
        client.release();
      }
    } catch (err: any) {
      isPostgresConnected = false;
      console.warn('[PostgreSQL Warning] Database connection failed or database unreachable:', err.message);
      console.log('[Database Fallback] Operating with resilient in-memory relational store.');
    }
  })();

  return initPromise;
}

export function isDbLive(): boolean {
  return isPostgresConnected;
}

export async function runQuery<T extends QueryResultRow = any>(sql: string, params: any[] = []): Promise<QueryResult<T> | null> {
  const activePool = getPool();
  if (!activePool || !isPostgresConnected) {
    return null;
  }

  try {
    return await activePool.query<T>(sql, params);
  } catch (err: any) {
    console.warn('[PostgreSQL Query Error]:', err.message);
    return null;
  }
}
