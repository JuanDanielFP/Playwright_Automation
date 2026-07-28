const { test, expect } = require('./fixtures/test.fixture');
const { USERS } = require('./data/test-data');

test.describe('📸 Visual Regression Tests - Saucedemo', () => {

  test('TC-VISUAL-01: Visual regression - Halaman Login', async ({ page, loginPage }) => {
    await loginPage.goto();
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('TC-VISUAL-02: Visual regression - Halaman Inventory', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await page.waitForURL(/.*inventory/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await page.locator('.inventory_item_img').first().waitFor();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('inventory-page.png');
  });

  test('TC-VISUAL-03: Visual regression - Halaman Cart', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await page.waitForURL(/.*inventory/);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await page.waitForURL(/.*cart/);
    await expect(page).toHaveScreenshot('cart-page.png');
  });

  test('TC-VISUAL-04: Visual regression - Halaman Form Checkout', async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await page.waitForURL(/.*inventory/);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await cartPage.checkout();
    await page.waitForURL(/.*checkout-step-one/);
    await expect(page).toHaveScreenshot('checkout-step-one-page.png');
  });

});
