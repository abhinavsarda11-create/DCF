import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function runLocalDbTest() {
  const dbUrl = process.env.DATABASE_URL;

  console.log('====================================================');
  console.log('   Dawn Child Foundation • Local PostgreSQL Check');
  console.log('====================================================\n');

  if (!dbUrl) {
    console.error('❌ DATABASE_URL is not defined in your .env file!');
    console.log('\n👉 Add this line to your .env file:');
    console.log('   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dawn_child_foundation"');
    console.log('\n(Replace "your_password" with your actual local PostgreSQL password)\n');
    process.exit(1);
  }

  // Obfuscate password in display
  const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':••••••@');
  console.log(`🔌 Target Connection: ${maskedUrl}`);

  const pool = new Pool({
    connectionString: dbUrl,
    ssl: dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1') ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    console.log('⏳ Connecting to local PostgreSQL...');
    const client = await pool.connect();
    console.log('✅ Connection established successfully!\n');

    // 1. Check PostgreSQL Server Version
    const verRes = await client.query('SELECT version();');
    console.log(`📦 Server Version: ${verRes.rows[0].version.split(',')[0]}`);

    // 2. Auto-initialize tables if needed
    console.log('⏳ Verifying tables (certificates, chat_sessions, chat_messages)...');
    await client.query(`
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

      CREATE TABLE IF NOT EXISTS chat_sessions (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(120) UNIQUE NOT NULL,
        user_id VARCHAR(120),
        started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(120) NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
        sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'assistant')),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Tables verified and ready!');

    // 3. Count existing records
    const certCount = await client.query('SELECT COUNT(*) as count FROM certificates;');
    const sessCount = await client.query('SELECT COUNT(*) as count FROM chat_sessions;');
    const msgCount = await client.query('SELECT COUNT(*) as count FROM chat_messages;');

    console.log('\n📊 Current Database Statistics:');
    console.log(`   • Certificates recorded: ${certCount.rows[0].count}`);
    console.log(`   • Chat sessions active:  ${sessCount.rows[0].count}`);
    console.log(`   • Chat messages stored:  ${msgCount.rows[0].count}`);

    client.release();
    await pool.end();

    console.log('\n🎉 Local PostgreSQL is fully configured and operational with your Express backend!');
  } catch (err: any) {
    console.error('\n❌ Connection Failed:', err.message);
    console.log('\nTroubleshooting Tips:');
    if (err.message.includes('password authentication failed')) {
      console.log('👉 Password incorrect in DATABASE_URL. Check your PostgreSQL user/password.');
    } else if (err.message.includes('does not exist')) {
      console.log('👉 Database does not exist yet. Run this command in your terminal/psql:');
      console.log('   CREATE DATABASE dawn_child_foundation;');
    } else if (err.message.includes('ECONNREFUSED')) {
      console.log('👉 PostgreSQL is not running on port 5432.');
      console.log('   Windows: Check "Services" -> start "postgresql-x64-..."');
      console.log('   Mac:     brew services start postgresql@16');
      console.log('   Linux:   sudo systemctl start postgresql');
    }
    process.exit(1);
  }
}

runLocalDbTest();
