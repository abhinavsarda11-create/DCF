-- ====================================================================
-- Dawn Child Foundation (Shubh: Aarambh)
-- Local PostgreSQL Database Initialization Script
-- ====================================================================

-- 1. Create database (run separately if not connected to the target database)
-- CREATE DATABASE dawn_child_foundation;

-- Connect to the database before running the tables creation:
-- \c dawn_child_foundation;

-- 2. Certificates Table
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
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at DESC);

-- 3. Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(120) UNIQUE NOT NULL,
    user_id VARCHAR(120),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON chat_sessions(updated_at DESC);

-- 4. Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(120) NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
    sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'assistant')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at ASC);

-- 5. Seed Initial Verification Records (Optional Demonstration Data)
INSERT INTO certificates (certificate_number, donor_name, donor_email, donation_amount, certificate_level, issued_at)
VALUES 
    ('DCF-CERT-2026-100001', 'Dr. Anand Mahindra', 'anand.m@example.org', 15000.00, 'diamond', CURRENT_TIMESTAMP),
    ('DCF-CERT-2026-100002', 'Sunita Kapoor', 'sunita.k@example.com', 5000.00, 'gold', CURRENT_TIMESTAMP)
ON CONFLICT (certificate_number) DO NOTHING;

-- Confirmation output
SELECT 'Database schema successfully initialized for Dawn Child Foundation!' AS status;
