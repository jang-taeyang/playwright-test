import { test, expect } from './auth-utils';

test('List Stuff Page displays correctly', async ({ getUserPage }) => {
  const page = await getUserPage('john@foo.com', 'changeme');

  // Wait until the login/redirect is completely finished
  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');

  // Wait until URL stops changing (extra safe)
  await page.waitForURL(/.*/); // waits for any URL to settle

  // Now it's safe to navigate to /list
  await page.goto('http://localhost:3000/list', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { name: 'Stuff' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();

  const rows = page.locator('table tbody tr');
  const count = await rows.count();
  expect(count).toBeGreaterThan(0);

  await expect(page.getByRole('link', { name: 'Add Stuff' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'List Stuff' })).toBeVisible();
});
