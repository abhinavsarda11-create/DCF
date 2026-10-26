import { runQuery, memoryStore, isDbLive } from './index.ts';

export interface ChatSessionRecord {
  id: number | string;
  session_id: string;
  user_id: string | null;
  started_at: string;
  updated_at: string;
}

export interface ChatMessageRecord {
  id: number | string;
  session_id: string;
  sender: 'user' | 'assistant';
  message: string;
  created_at: string;
}

export function generateSessionId(): string {
  const rand = Math.random().toString(36).substring(2, 10);
  return `session_${Date.now()}_${rand}`;
}

export async function getOrCreateSession(
  sessionId?: string | null,
  userId?: string | null
): Promise<ChatSessionRecord> {
  const cleanSessionId = sessionId && sessionId.trim() ? sessionId.trim() : generateSessionId();
  const nowIso = new Date().toISOString();

  if (isDbLive()) {
    // Try to find existing session
    const findSql = 'SELECT * FROM chat_sessions WHERE session_id = $1;';
    const existing = await runQuery<ChatSessionRecord>(findSql, [cleanSessionId]);
    if (existing && existing.rows.length > 0) {
      return existing.rows[0];
    }

    // Insert new session
    const insertSql = `
      INSERT INTO chat_sessions (session_id, user_id, started_at, updated_at)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (session_id) DO UPDATE SET updated_at = EXCLUDED.updated_at
      RETURNING *;
    `;
    const result = await runQuery<ChatSessionRecord>(insertSql, [cleanSessionId, userId || null, nowIso, nowIso]);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    }
  }

  // In-Memory Storage Fallback
  const existingMemory = memoryStore.chatSessions.find((s) => s.session_id === cleanSessionId);
  if (existingMemory) {
    existingMemory.updated_at = nowIso;
    return existingMemory;
  }

  const newSession: ChatSessionRecord = {
    id: memoryStore.nextSessionId++,
    session_id: cleanSessionId,
    user_id: userId || null,
    started_at: nowIso,
    updated_at: nowIso,
  };

  memoryStore.chatSessions.unshift(newSession);
  return newSession;
}

export async function saveChatMessage(
  sessionId: string,
  sender: 'user' | 'assistant',
  message: string
): Promise<ChatMessageRecord> {
  const cleanSessionId = sessionId.trim();
  const cleanMessage = message.trim();
  const nowIso = new Date().toISOString();

  // Ensure session exists
  await getOrCreateSession(cleanSessionId);

  if (isDbLive()) {
    const insertMsgSql = `
      INSERT INTO chat_messages (session_id, sender, message, created_at)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const updateSessionSql = `
      UPDATE chat_sessions
      SET updated_at = $1
      WHERE session_id = $2;
    `;

    const [msgResult] = await Promise.all([
      runQuery<ChatMessageRecord>(insertMsgSql, [cleanSessionId, sender, cleanMessage, nowIso]),
      runQuery(updateSessionSql, [nowIso, cleanSessionId]),
    ]);

    if (msgResult && msgResult.rows.length > 0) {
      return msgResult.rows[0];
    }
  }

  // In-Memory Fallback
  const newMsg: ChatMessageRecord = {
    id: memoryStore.nextMessageId++,
    session_id: cleanSessionId,
    sender,
    message: cleanMessage,
    created_at: nowIso,
  };

  memoryStore.chatMessages.push(newMsg);

  // Update session in memory
  const session = memoryStore.chatSessions.find((s) => s.session_id === cleanSessionId);
  if (session) {
    session.updated_at = nowIso;
  }

  return newMsg;
}

export async function getSessionMessages(sessionId: string): Promise<ChatMessageRecord[]> {
  const cleanSessionId = sessionId.trim();

  if (isDbLive()) {
    const sql = `
      SELECT * FROM chat_messages
      WHERE session_id = $1
      ORDER BY created_at ASC;
    `;
    const result = await runQuery<ChatMessageRecord>(sql, [cleanSessionId]);
    if (result) {
      return result.rows;
    }
  }

  return memoryStore.chatMessages.filter((m) => m.session_id === cleanSessionId);
}

export async function getSession(sessionId: string): Promise<ChatSessionRecord | null> {
  const cleanSessionId = sessionId.trim();

  if (isDbLive()) {
    const sql = 'SELECT * FROM chat_sessions WHERE session_id = $1;';
    const result = await runQuery<ChatSessionRecord>(sql, [cleanSessionId]);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    }
  }

  return memoryStore.chatSessions.find((s) => s.session_id === cleanSessionId) || null;
}

export async function getChatAnalytics(): Promise<{
  totalSessions: number;
  totalMessages: number;
  recentSessions: ChatSessionRecord[];
}> {
  if (isDbLive()) {
    const sessCountRes = await runQuery<{ count: string }>('SELECT COUNT(*) as count FROM chat_sessions;');
    const msgCountRes = await runQuery<{ count: string }>('SELECT COUNT(*) as count FROM chat_messages;');
    const recentSessRes = await runQuery<ChatSessionRecord>(
      'SELECT * FROM chat_sessions ORDER BY updated_at DESC LIMIT 10;'
    );

    return {
      totalSessions: sessCountRes ? parseInt(sessCountRes.rows[0].count, 10) : 0,
      totalMessages: msgCountRes ? parseInt(msgCountRes.rows[0].count, 10) : 0,
      recentSessions: recentSessRes?.rows || [],
    };
  }

  return {
    totalSessions: memoryStore.chatSessions.length,
    totalMessages: memoryStore.chatMessages.length,
    recentSessions: memoryStore.chatSessions.slice(0, 10),
  };
}
