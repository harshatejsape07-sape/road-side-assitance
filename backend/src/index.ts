import express, { Application } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import { config, connectDatabase, Logger } from '@/config';
import { errorHandler, rateLimiter } from '@/middleware';
import authRoutes from '@/routes/authRoutes';
import mechanicRoutes from '@/routes/mechanicRoutes';
import vehicleRoutes from '@/routes/vehicleRoutes';
import requestRoutes from '@/routes/requestRoutes';
import paymentRoutes from '@/routes/paymentRoutes';
import reviewRoutes from '@/routes/reviewRoutes';

const logger = Logger.getLogger('App');

const app: Application = express();

// Trust proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
  })
);

// Rate limiting
app.use('/api/', rateLimiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// API Routes
const apiPrefix = config.apiPrefix;

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/mechanics`, mechanicRoutes);
app.use(`${apiPrefix}/vehicles`, vehicleRoutes);
app.use(`${apiPrefix}/requests`, requestRoutes);
app.use(`${apiPrefix}/payments`, paymentRoutes);
app.use(`${apiPrefix}/reviews`, reviewRoutes);

// Root API endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Road-Side Assistance API v1',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: `${apiPrefix}/auth`,
      mechanics: `${apiPrefix}/mechanics`,
      vehicles: `${apiPrefix}/vehicles`,
      requests: `${apiPrefix}/requests`,
      payments: `${apiPrefix}/payments`,
      reviews: `${apiPrefix}/reviews`,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    const server = app.listen(config.port, config.host, () => {
      logger.info(`✓ Server running on http://${config.host}:${config.port}`);
      logger.info(`✓ Environment: ${config.nodeEnv}`);
      logger.info(`✓ API Version: ${config.apiVersion}`);
      logger.info(`✓ API Prefix: ${apiPrefix}`);
      logger.info(`✓ Database: Connected`);
      logger.info(`✓ Health check: http://${config.host}:${config.port}/health`);
    });

    // Handle graceful shutdown
    const shutdown = () => {
      logger.info('Shutting down gracefully...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
