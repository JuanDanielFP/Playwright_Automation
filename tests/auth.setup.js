const { test: setup, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/saucedemo.pages');
const { USERS } = require('./data/test-data');

const authFile = 'playwright/.auth/user.json';

setup('authenticate as standard_user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
  await page.waitForURL(/.*inventory/);
  await expect(page.locator('.title')).toHaveText('Products');
  
  // Simpan state otentikasi (cookies, localStorage) ke file JSON
  await page.context().storageState({ path: authFile });
});
