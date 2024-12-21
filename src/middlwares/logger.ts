import { NextFunction, Request, Response } from 'express';
import chalk from 'chalk';

// Using dynamic import for chalk since it's an ESM module


interface LoggerOptions {
  excludeRoutes?: string[];
  excludeMethods?: string[];
}

export const logger = (options: LoggerOptions = {}) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Ensure chalk is loaded
   
    const start = process.hrtime();

    // Skip logging for excluded routes or methods
    if (
      options.excludeRoutes?.some(route => req.path.startsWith(route)) ||
      options.excludeMethods?.includes(req.method)
    ) {
      return next();
    }

    // Hook into response finish to log details
    res.on('finish', () => {
      const duration = process.hrtime(start);
      const responseTime = (duration[0] * 1e3 + duration[1] / 1e6).toFixed(2);

      // Define method colors
      const methodColor = {
        GET: chalk.green,
        POST: chalk.blue,
        PUT: chalk.yellow,
        DELETE: chalk.red
      }[req.method] || chalk.white;

      // Define status color based on response code
      const statusColor = res.statusCode < 400 ? chalk.green : chalk.red;

      // Construct and print the log message
      const log = [
        `[${chalk.gray(new Date().toISOString())}]`,
        methodColor(req.method),
        chalk.cyan(req.originalUrl),
        statusColor(res.statusCode),
        '-',
        chalk.magenta(`${responseTime} ms`)
      ].join(' ');

      console.log(log);
    });

    next();
  };
};

// Export types for better TypeScript integration
export type { LoggerOptions }; 
