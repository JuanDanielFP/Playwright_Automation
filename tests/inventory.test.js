const { test, expect } = require('./fixtures/test.fixture');
const { USERS } = require('./data/test-data');
const { takeScreenshot } = require('./helpers/screenshot.helper');

const SUITE = 'inventory';

test.describe('🛍️ Inventory / Product Tests - Saucedemo', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await page.waitForURL(/.*inventory/);
  });

  test('TC-INV-01: Halaman inventory menampilkan 6 produk', async ({ page, inventoryPage }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-01', '01_halaman-inventory-6-produk');
    const count = await inventoryPage.getItemCount();
    expect(count).toBe(6);
  });

  test('TC-INV-02: Judul halaman adalah "Products"', async ({ page, inventoryPage }) => {
    const title = await inventoryPage.getTitle();
    expect(title).toBe('Products');
    await takeScreenshot(page, SUITE, 'TC-INV-02', '01_judul-halaman-products');
  });

  test('TC-INV-03: Sort produk A to Z', async ({ page, inventoryPage }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-03', '01_sebelum-sort');
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getAllItemNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
    await takeScreenshot(page, SUITE, 'TC-INV-03', '02_sesudah-sort-AZ');
  });

  test('TC-INV-04: Sort produk Z to A', async ({ page, inventoryPage }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-04', '01_sebelum-sort');
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getAllItemNames();
    const sortedDesc = [...names].sort().reverse();
    expect(names).toEqual(sortedDesc);
    await takeScreenshot(page, SUITE, 'TC-INV-04', '02_sesudah-sort-ZA');
  });

  test('TC-INV-05: Sort produk harga rendah ke tinggi', async ({ page, inventoryPage }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-05', '01_sebelum-sort');
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getAllItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
    await takeScreenshot(page, SUITE, 'TC-INV-05', '02_sort-harga-rendah-tinggi');
  });

  test('TC-INV-06: Sort produk harga tinggi ke rendah', async ({ page, inventoryPage }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-06', '01_sebelum-sort');
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getAllItemPrices();
    const sortedPricesDesc = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPricesDesc);
    await takeScreenshot(page, SUITE, 'TC-INV-06', '02_sort-harga-tinggi-rendah');
  });

  test('TC-INV-07: Tambah produk ke cart - cart badge bertambah', async ({ page, inventoryPage }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-07', '01_cart-kosong');
    const initialCount = await inventoryPage.getCartCount();
    expect(initialCount).toBe(0);

    await inventoryPage.addFirstItemToCart();
    const newCount = await inventoryPage.getCartCount();
    expect(newCount).toBe(1);
    await takeScreenshot(page, SUITE, 'TC-INV-07', '02_cart-badge-1');
  });

  test('TC-INV-08: Tambah multiple produk ke cart', async ({ page, inventoryPage }) => {
    await inventoryPage.addItemByIndex(0);
    await takeScreenshot(page, SUITE, 'TC-INV-08', '01_tambah-produk-1');
    await inventoryPage.addItemByIndex(1);
    await takeScreenshot(page, SUITE, 'TC-INV-08', '02_tambah-produk-2');
    await inventoryPage.addItemByIndex(2);
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(3);
    await takeScreenshot(page, SUITE, 'TC-INV-08', '03_cart-badge-3');
  });

  test('TC-INV-09: Tombol berubah dari "Add to cart" ke "Remove" setelah tambah produk', async ({ page, inventoryPage }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-09', '01_tombol-add-to-cart');
    await inventoryPage.addFirstItemToCart();
    const removeBtn = page.locator('[data-test^="remove"]').first();
    await expect(removeBtn).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-INV-09', '02_tombol-berubah-jadi-remove');
  });

  test('TC-INV-10: Klik pada nama produk membuka detail produk', async ({ page }) => {
    await takeScreenshot(page, SUITE, 'TC-INV-10', '01_halaman-inventory');
    await page.locator('.inventory_item_name').first().click();
    await expect(page).toHaveURL(/.*inventory-item/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-INV-10', '02_halaman-detail-produk');
  });
});
