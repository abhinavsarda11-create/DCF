const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB, isDBConnected } = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware: CORS
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev mode
    },
    credentials: true,
  })
);

// Middleware: Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Dawn Child Foundation (DCF) Backend API',
    version: '1.0.0',
    database: isDBConnected() ? 'connected' : 'in-memory-fallback',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/pledge',
      '/api/volunteer',
      '/api/donation',
      '/api/event',
      '/api/contact',
      '/api/auth',
      '/api/admin',
    ],
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pledge', require('./routes/pledge.routes'));
app.use('/api/volunteer', require('./routes/volunteer.routes'));
app.use('/api/donation', require('./routes/donation.routes'));
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/event', require('./routes/event.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route '${req.originalUrl}' not found on DCF Backend.`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[DCF Backend Error]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Server Starter
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`  Dawn Child Foundation Backend running on port ${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`====================================================`);
  });
  return server;
};

// Auto-start if run directly
if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
