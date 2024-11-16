import allureReporter from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';
import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = path.join(__dirname, '../../logs'); // Path to the logs directory
// Create the logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console({ level: 'debug' }), // Log to console at 'debug' level
    new transports.File({ filename: `${logDir}/application.log`, level: 'info' }) // Write logs to a file
  ]
});

export default class Logger {
  // Log information with Allure step
  static info(message: string) {
    console.log(`INFO: ${message}`);
    logger.info(message);
    allureReporter.addStep(message, { name: 'info', content: message }, 'passed' as Status);
  }

  // Log warnings with Allure step
  static warn(message: string) {
    console.warn(`WARN: ${message}`);
    logger.warn(message);
    allureReporter.addStep(message, { name: 'warn', content: message }, 'broken' as Status);
  }

  // Log errors with Allure step
  static error(message: string) {
    console.error(`ERROR: ${message}`);
    logger.error(message);
    allureReporter.addStep(message, { name: 'error', content: message }, 'failed' as Status);
  }

  // Start a new Allure step (if needed for longer steps)
  static startStep(stepName: string) {
    allureReporter.startStep(stepName);
  }

  // End the Allure step (if needed for longer steps)
  static endStep() {
    allureReporter.endStep();
  }
}
