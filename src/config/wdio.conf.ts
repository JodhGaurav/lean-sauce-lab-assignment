import type { Options } from '@wdio/types';
import AllureReporter from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

export const MARKER = String(process.env.marker).split(',');
export const environment = process.env.environment || 'prod';
export const browserParam = process.env.browser || 'chrome';

let baseUrl;

if (environment === 'uat') {
  baseUrl = 'https://www.saucedemo.com'; //can update url as per env
} else if (environment === 'dev') {
  baseUrl = 'https://www.saucedemo.com'; //can update url as per env
} else if (environment === 'prod') {
  baseUrl = 'https://www.saucedemo.com'; //can update url as per env
}

// Dynamically configure capabilities based on browser
const capabilities = [];
if (browserParam === 'chrome') {
  capabilities.push({
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--start-maximized', '--allow-running-insecure-content', '--disable-web-security']
    },
    acceptInsecureCerts: true
  });
} else if (browserParam === 'firefox') {
  capabilities.push({
    maxInstances: 1,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['-width=1920', '-height=1080'] // Maximizes Firefox window
    },
    acceptInsecureCerts: true
  });
} else if (browserParam === 'safari') {
  capabilities.push({
    maxInstances: 1,
    browserName: 'safari'
  });
}

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['../tests/**/*.spec.ts'],
  maxInstances: 10,
  capabilities: capabilities, // Use dynamically configured capabilities
  logLevel: 'info',
  bail: 0,
  baseUrl: baseUrl,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  reporters: ['spec', ['allure', { outputDir: 'reports/allure-results', disableWebdriverStepsReporting: true, disableWebdriverScreenshotsReporting: false }]],
  // Options to be passed to Jasmine.
  jasmineOpts: {
    // Jasmine default timeout
    defaultTimeoutInterval: 1200000,
    grep: process.env.marker,
    // The Jasmine framework allows interception of each assertion in order to log the state of the application
    // or website depending on the result. For example, it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function (passed, assertion) {
      // do something
      console.log('passed:', passed);
      console.log('assertion:', assertion);
    }
  },
  beforeTest: async (test) => {
    const testName = test.description || 'Unnamed Test';
    const featureName = test.parent || 'Unnamed Feature';

    AllureReporter.addFeature(featureName);
    AllureReporter.addStory(testName);
    AllureReporter.startStep(`Starting test: ${testName}`);
  },

  afterTest: async (test, context, { error, result, duration, passed }) => {
    AllureReporter.endStep();
    const testName = test.description || 'Unnamed Test';
    if (!passed) {
      AllureReporter.addStep(`Test failed: ${testName}`, { content: error?.message }, 'failed' as Status);
      AllureReporter.addAttachment('Screenshot on Failure', await browser.takeScreenshot(), 'image/png');
    } else {
      AllureReporter.addStep(`Test passed: ${testName}`);
    }
  }
};
