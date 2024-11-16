import allureReporter from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

export default class Logger {
  // Log information with Allure step
  static info(message: string) {
    console.log(`INFO: ${message}`);
    allureReporter.addStep(message, { name: 'info', content: message }, 'passed' as Status);
  }

  // Log warnings with Allure step
  static warn(message: string) {
    console.warn(`WARN: ${message}`);
    allureReporter.addStep(message, { name: 'warn', content: message }, 'broken' as Status);
  }

  // Log errors with Allure step
  static error(message: string) {
    console.error(`ERROR: ${message}`);
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
