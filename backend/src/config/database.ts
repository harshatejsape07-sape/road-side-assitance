import mongoose from 'mongoose';
import Logger from './logger';

const logger = Logger.getLogger('Database');

const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/roadside-assistance';
    
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGODB_DB_NAME || 'roadside-assistance',
    });

    logger.info('✓ MongoDB connected successfully');
    
    // Connection events
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error:', error);
    });
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected');
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error);
  }
};

export { connectDatabase, disconnectDatabase };
