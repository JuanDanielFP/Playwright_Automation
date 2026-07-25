const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/saucedemo.pages');
const { USERS } = require('./data/test-data');
const { takeScreenshot } = require('./helpers/screenshot.helper');

const SUITE = 'login';

test.describe('🔐 Login Tests - Saucedemo', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-LOGIN-01: Login berhasil dengan standard_user', async ({ page }) => {
    // Step 1: Tampilan halaman login
    await takeScreenshot(page, SUITE, 'TC-LOGIN-01', '01_halaman-login');

    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

    // Step 2: Setelah login berhasil - halaman inventory
    await expect(page).toHaveURL(/.*inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
    await takeScreenshot(page, SUITE, 'TC-LOGIN-01', '02_login-sukses-inventory');
  });

  test('TC-LOGIN-02: Login gagal dengan user yang di-lock', async ({ page }) => {
    // Step 1: Halaman login
    await takeScreenshot(page, SUITE, 'TC-LOGIN-02', '01_halaman-login');

    await loginPage.login(USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password);

    // Step 2: Pesan error muncul
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('locked out');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-LOGIN-02', '02_error-user-locked');
  });

  test('TC-LOGIN-03: Login gagal dengan kredensial tidak valid', async ({ page }) => {
    await takeScreenshot(page, SUITE, 'TC-LOGIN-03', '01_halaman-login');

    await loginPage.login(USERS.INVALID.username, USERS.INVALID.password);

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('do not match');
    await takeScreenshot(page, SUITE, 'TC-LOGIN-03', '02_error-kredensial-invalid');
  });

  test('TC-LOGIN-04: Login gagal tanpa username', async ({ page }) => {
    await takeScreenshot(page, SUITE, 'TC-LOGIN-04', '01_halaman-login');

    await loginPage.login('', USERS.STANDARD.password);

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Username is required');
    await takeScreenshot(page, SUITE, 'TC-LOGIN-04', '02_error-username-kosong');
  });

  test('TC-LOGIN-05: Login gagal tanpa password', async ({ page }) => {
    await takeScreenshot(page, SUITE, 'TC-LOGIN-05', '01_halaman-login');

    await loginPage.login(USERS.STANDARD.username, '');

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('Password is required');
    await takeScreenshot(page, SUITE, 'TC-LOGIN-05', '02_error-password-kosong');
  });

  test('TC-LOGIN-06: Verifikasi elemen UI halaman login', async ({ page }) => {
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
    await expect(page.locator('.login_logo')).toContainText('Swag Labs');

    // Screenshot verifikasi semua elemen ada
    await takeScreenshot(page, SUITE, 'TC-LOGIN-06', '01_verifikasi-elemen-UI');
  });

  test('TC-LOGIN-07: Login dengan performance_glitch_user', async ({ page }) => {
    test.slow();
    await takeScreenshot(page, SUITE, 'TC-LOGIN-07', '01_halaman-login');

    await loginPage.login(USERS.PERFORMANCE_GLITCH.username, USERS.PERFORMANCE_GLITCH.password);

    await expect(page).toHaveURL(/.*inventory/, { timeout: 10000 });
    await takeScreenshot(page, SUITE, 'TC-LOGIN-07', '02_login-performance-glitch-sukses');
  });
});
