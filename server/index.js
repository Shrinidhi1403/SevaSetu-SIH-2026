import express from 'express';
import cors from 'cors';
import { store } from './store.js';

import authRoutes from './routes/auth.js';
import patientsRoutes from './routes/patients.js';
import facilitiesRoutes from './routes/facilities.js';
import referralsRoutes from './routes/referrals.js';
import inventoryRoutes from './routes/inventory.js';
import ashaRoutes from './routes/asha.js';
import analyticsRoutes from './routes/analytics.js';
import alertsRoutes from './routes/alerts.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString().slice(11, 19)}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/referrals', referralsRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/asha', ashaRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/alerts', alertsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'SevaSetu Rural Healthcare API Server',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found on SevaSetu API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[API Server Error]:', err);
  res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🏥 SevaSetu Backend API Server is running`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 ABDM & eSanjeevani Telemetry Emulation Active`);
  console.log(`====================================================`);
});
