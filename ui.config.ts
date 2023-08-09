import { defineConfig , devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests/ui/',
  reporter: [ ['html', { open: 'never' }] ],
  use: {
    baseURL: 'https://standards.cencenelec.eu/dyn/www/f?p=CEN:105::RESET',
    screenshot: 'only-on-failure',
    browserName: 'chromium',
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
