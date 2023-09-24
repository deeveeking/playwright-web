import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// Read from default ".env" file.
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */const config: PlaywrightTestConfig = {
  testDir: './automation',
  /* Maximum time one test can run for. */
  timeout: 0,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10 * 1000,
    navigationTimeout: 10 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    /* Screenshots on failure */
    screenshot: 'only-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    testIdAttribute: 'id',
  },
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 15000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 8,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }]],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Mobile_Safari',
      use: {
        ...devices['iPhone 12'],
      },
      grep: [new RegExp("@mobile")],
    },
    {
      name: 'Desktop_Chrome',
      use: {
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
      },
      grep: [new RegExp("@desktop")],
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
