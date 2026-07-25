const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage, CartPage } = require('./pages/saucedemo.pages');
const { USERS } = require('./data/test-data');
const { takeScreenshot } = require('./helpers/screenshot.helper');

const SUITE = 'cart';

test.describe('🛒 Cart Tests - Saucedemo', () => {
  let inventoryPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await page.waitForURL(/.*inventory/);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('TC-CART-01: Cart kosong saat pertama kali masuk', async ({ page }) => {
    await inventoryPage.goToCart();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await takeScreenshot(page, SUITE, 'TC-CART-01', '01_cart-kosong');
  });

  test('TC-CART-02: Produk yang ditambah muncul di cart', async ({ page }) => {
    const itemNames = await inventoryPage.getAllItemNames();
    const firstItemName = itemNames[0];
    await inventoryPage.addFirstItemToCart();
    await takeScreenshot(page, SUITE, 'TC-CART-02', '01_produk-ditambah-dari-inventory');

    await inventoryPage.goToCart();
    const cartNames = await cartPage.getCartItemNames();
    expect(cartNames).toContain(firstItemName);
    await takeScreenshot(page, SUITE, 'TC-CART-02', '02_produk-muncul-di-cart');
  });

  test('TC-CART-03: Multiple produk di cart', async ({ page }) => {
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.addItemByIndex(1);
    await takeScreenshot(page, SUITE, 'TC-CART-03', '01_2-produk-ditambah');

    await inventoryPage.goToCart();
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
    await takeScreenshot(page, SUITE, 'TC-CART-03', '02_cart-berisi-2-produk');
  });

  test('TC-CART-04: Hapus produk dari cart', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    expect(await cartPage.getCartItemCount()).toBe(1);
    await takeScreenshot(page, SUITE, 'TC-CART-04', '01_cart-berisi-1-produk');

    await cartPage.removeItem(0);
    expect(await cartPage.getCartItemCount()).toBe(0);
    await takeScreenshot(page, SUITE, 'TC-CART-04', '02_cart-kosong-setelah-hapus');
  });

  test('TC-CART-05: Tombol "Continue Shopping" kembali ke inventory', async ({ page }) => {
    await inventoryPage.goToCart();
    await takeScreenshot(page, SUITE, 'TC-CART-05', '01_halaman-cart');
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/.*inventory/);
    await takeScreenshot(page, SUITE, 'TC-CART-05', '02_kembali-ke-inventory');
  });

  test('TC-CART-06: Tombol "Checkout" menuju ke halaman checkout', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await takeScreenshot(page, SUITE, 'TC-CART-06', '01_cart-dengan-produk');
    await cartPage.checkout();
    await expect(page).toHaveURL(/.*checkout-step-one/);
    await takeScreenshot(page, SUITE, 'TC-CART-06', '02_halaman-checkout-step1');
  });

  test('TC-CART-07: Cart badge hilang setelah semua item dihapus', async ({ page }) => {
    await inventoryPage.addFirstItemToCart();
    await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-CART-07', '01_badge-ada');

    await page.locator('[data-test^="remove"]').first().click();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-CART-07', '02_badge-hilang');
  });
});
