import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry failed tests one time */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,

  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit-report.xml', includeProjectInTestName: true }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,

      environmentInfo: {
        framework: 'Playwright',
        node_version: process.version,
        os: process.platform
      }
    }],
    //['./console-reporter.ts'],
    ['list']
  ],

  /* Maximum time one test can run */
  timeout: 300 * 1000,

  /* Maximum time for the entire test suite */
  globalTimeout: 3600 * 1000,

  /* Maximum time for expect() assertions */
  expect: {
    timeout: 10 * 1000
  },

  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',

    /* Video recording for all tests */
    video: 'on',

    /* Screenshot on failure */
    screenshot: 'on',

    /* Maximum time for each action (click, fill, etc.) */
    actionTimeout: 40 * 1000,

    /* Maximum time for navigation actions */
    navigationTimeout: 60 * 1000,

    headless: true,

    // launchOptions:{

    // slowMo:800,

    //  }

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],

});

