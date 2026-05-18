import pino from 'pino';

class Logger {
  private static loggers: Map<string, pino.Logger> = new Map();

  static getLogger(name: string): pino.Logger {
    if (!this.loggers.has(name)) {
      const transport = process.env.NODE_ENV === 'development'
        ? pino.transport({
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          })
        : undefined;

      const logger = pino(
        {
          name,
          level: process.env.LOG_LEVEL || 'info',
          timestamp: pino.stdTimeFunctions.isoTime,
        },
        transport
      );

      this.loggers.set(name, logger);
    }

    return this.loggers.get(name)!;
  }
}

export default Logger;
