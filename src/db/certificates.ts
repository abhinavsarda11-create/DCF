import { runQuery, memoryStore, isDbLive } from './index.ts';

export interface CertificateRecord {
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

export interface CreateCertificateInput {
  donor_name: string;
  donor_email: string;
  donation_amount: number;
  donation_id?: string | null;
  pdf_reference?: string | null;
  certificate_number?: string;
  issued_at?: string;
}

/**
 * Server-side determination of certificate level based on donation amount.
 * Strictly mirrors the foundation's existing tier rules.
 */
export function calculateCertificateLevel(amountNum: number): 'diamond' | 'gold' | 'silver' | 'bronze' {
  if (amountNum > 10000) {
    return 'diamond';
  } else if (amountNum >= 1001) {
    return 'gold';
  } else if (amountNum >= 101) {
    return 'silver';
  } else {
    return 'bronze';
  }
}

/**
 * Generates an official, unique certificate number
 */
export function generateCertificateNumber(): string {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `DCF-CERT-2026-${randomSuffix}`;
}

export async function createCertificate(data: CreateCertificateInput): Promise<CertificateRecord> {
  const validatedAmount = Math.max(1, Number(data.donation_amount) || 1);
  const calculatedLevel = calculateCertificateLevel(validatedAmount);
  const certNumber = data.certificate_number && data.certificate_number.trim()
    ? data.certificate_number.trim()
    : generateCertificateNumber();
  const nowIso = new Date().toISOString();
  const issuedAt = data.issued_at || nowIso;

  if (isDbLive()) {
    const sql = `
      INSERT INTO certificates (
        certificate_number, donor_name, donor_email, donation_amount,
        certificate_level, donation_id, pdf_reference, issued_at, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const params = [
      certNumber,
      data.donor_name.trim(),
      data.donor_email.trim().toLowerCase(),
      validatedAmount,
      calculatedLevel,
      data.donation_id || null,
      data.pdf_reference || null,
      issuedAt,
      nowIso,
    ];

    const result = await runQuery<CertificateRecord>(sql, params);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    }
  }

  // Resilient In-Memory Storage Fallback
  // Ensure certificate_number uniqueness in memory
  let finalCertNumber = certNumber;
  if (memoryStore.certificates.some((c) => c.certificate_number === finalCertNumber)) {
    finalCertNumber = generateCertificateNumber();
  }

  const newRecord: CertificateRecord = {
    id: memoryStore.nextCertId++,
    certificate_number: finalCertNumber,
    donor_name: data.donor_name.trim(),
    donor_email: data.donor_email.trim().toLowerCase(),
    donation_amount: validatedAmount,
    certificate_level: calculatedLevel,
    donation_id: data.donation_id || null,
    pdf_reference: data.pdf_reference || null,
    issued_at: issuedAt,
    created_at: nowIso,
  };

  memoryStore.certificates.unshift(newRecord);
  return newRecord;
}

export async function getCertificateById(id: number | string): Promise<CertificateRecord | null> {
  if (isDbLive()) {
    const sql = 'SELECT * FROM certificates WHERE id = $1;';
    const result = await runQuery<CertificateRecord>(sql, [Number(id) || id]);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    }
  }

  const found = memoryStore.certificates.find((c) => String(c.id) === String(id));
  return found || null;
}

export async function getCertificateByNumber(certificateNumber: string): Promise<CertificateRecord | null> {
  const cleanNumber = certificateNumber.trim();

  if (isDbLive()) {
    const sql = 'SELECT * FROM certificates WHERE certificate_number = $1;';
    const result = await runQuery<CertificateRecord>(sql, [cleanNumber]);
    if (result && result.rows.length > 0) {
      return result.rows[0];
    }
  }

  const found = memoryStore.certificates.find((c) => c.certificate_number.toLowerCase() === cleanNumber.toLowerCase());
  return found || null;
}

export async function listCertificates(limit = 50, offset = 0): Promise<{ total: number; certificates: CertificateRecord[] }> {
  if (isDbLive()) {
    const countSql = 'SELECT COUNT(*) as total FROM certificates;';
    const countResult = await runQuery<{ total: string }>(countSql);
    const total = countResult && countResult.rows.length > 0 ? parseInt(countResult.rows[0].total, 10) : 0;

    const listSql = 'SELECT * FROM certificates ORDER BY created_at DESC LIMIT $1 OFFSET $2;';
    const listResult = await runQuery<CertificateRecord>(listSql, [limit, offset]);
    return {
      total,
      certificates: listResult?.rows || [],
    };
  }

  return {
    total: memoryStore.certificates.length,
    certificates: memoryStore.certificates.slice(offset, offset + limit),
  };
}
