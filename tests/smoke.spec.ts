import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.ok()).toBeTruthy();
});

test('dynamic route responds', async ({ page }) => {
  const response = await page.goto('/example-page');
  expect(response?.status()).toBeLessThan(500);
});

test('studio route loads', async ({ page }) => {
  const response = await page.goto('/studio');
  expect(response?.ok()).toBeTruthy();
});
