const { test, expect } = require('./fixtures/test.fixture');
const { USERS } = require('./data/test-data');
const { takeScreenshot } = require('./helpers/screenshot.helper');

const SUITE = 'e2e';

test.describe('🔄 End-to-End Tests - Saucedemo', () => {

  test('TC-E2E-01: Full purchase flow - login, add to cart, checkout', async ({ page, loginPage, inventoryPage }) => {

    // Step 1: Login
    await loginPage.goto();
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '01_halaman-login');
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(page).toHaveURL(/.*inventory/);
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '02_login-sukses');

    // Step 2: Tambah 2 produk ke cart
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.addItemByIndex(2);
    expect(await inventoryPage.getCartCount()).toBe(2);
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '03_2-produk-ditambah-ke-cart');

    // Step 3: Ke Cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart/);
    expect(await page.locator('.cart_item').count()).toBe(2);
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '04_halaman-cart-2-item');

    // Step 4: Checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '05_checkout-step1-form');

    // Step 5: Isi informasi checkout
    await page.locator('[data-test="firstName"]').fill('Budi');
    await page.locator('[data-test="lastName"]').fill('Santoso');
    await page.locator('[data-test="postalCode"]').fill('40112');
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '06_form-terisi');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/.*checkout-step-two/);

    // Step 6: Verifikasi summary
    await expect(page.locator('.summary_info')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '07_checkout-step2-summary');
    await page.locator('[data-test="finish"]').click();

    // Step 7: Verifikasi order sukses
    await expect(page).toHaveURL(/.*checkout-complete/);
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order');
    await expect(page.locator('.pony_express')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-E2E-01', '08_order-complete-sukses');
  });

  test('TC-E2E-02: Login dan Logout', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await takeScreenshot(page, SUITE, 'TC-E2E-02', '01_halaman-login');
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await expect(page).toHaveURL(/.*inventory/);
    await takeScreenshot(page, SUITE, 'TC-E2E-02', '02_login-sukses');

    await inventoryPage.logout();
    await expect(page).toHaveURL('/');
    await expect(page.locator('#login-button')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-E2E-02', '03_logout-sukses-kembali-ke-login');
  });

  test('TC-E2E-03: Tidak bisa akses halaman inventory tanpa login', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('/');
    await takeScreenshot(page, SUITE, 'TC-E2E-03', '01_redirect-ke-login-tanpa-auth');
  });

  test('TC-E2E-04: Sort dan beli produk termurah', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await takeScreenshot(page, SUITE, 'TC-E2E-04', '01_inventory-default');

    await inventoryPage.sortBy('lohi');
    await takeScreenshot(page, SUITE, 'TC-E2E-04', '02_sort-harga-terendah');

    const names = await inventoryPage.getAllItemNames();
    const cheapestItem = names[0];

    await inventoryPage.addFirstItemToCart();
    await takeScreenshot(page, SUITE, 'TC-E2E-04', '03_produk-termurah-ditambah');

    await inventoryPage.goToCart();
    const cartNames = await page.locator('.inventory_item_name').allTextContents();
    expect(cartNames[0]).toBe(cheapestItem);
    await takeScreenshot(page, SUITE, 'TC-E2E-04', '04_produk-termurah-di-cart');
  });
});
