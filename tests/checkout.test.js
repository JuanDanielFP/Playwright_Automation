const { test, expect } = require('./fixtures/test.fixture');
const { USERS, CHECKOUT_INFO } = require('./data/test-data');
const { takeScreenshot } = require('./helpers/screenshot.helper');

const SUITE = 'checkout';

test.describe('💳 Checkout Tests - Saucedemo', () => {
  test.beforeEach(async ({ page, loginPage, inventoryPage, cartPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await page.waitForURL(/.*inventory/);

    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await cartPage.checkout();
    await page.waitForURL(/.*checkout-step-one/);
  });

  test('TC-CO-01: Checkout berhasil dengan informasi valid', async ({ page, checkoutPage }) => {
    await takeScreenshot(page, SUITE, 'TC-CO-01', '01_halaman-checkout-step1');
    await checkoutPage.fillInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    await takeScreenshot(page, SUITE, 'TC-CO-01', '02_form-diisi');
    await checkoutPage.continue();
    await expect(page).toHaveURL(/.*checkout-step-two/);
    await takeScreenshot(page, SUITE, 'TC-CO-01', '03_checkout-step2-overview');
  });

  test('TC-CO-02: Checkout gagal tanpa First Name', async ({ page, checkoutPage }) => {
    await takeScreenshot(page, SUITE, 'TC-CO-02', '01_form-tanpa-firstname');
    await checkoutPage.fillInfo('', CHECKOUT_INFO.VALID.lastName, CHECKOUT_INFO.VALID.postalCode);
    await checkoutPage.continue();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('First Name is required');
    await takeScreenshot(page, SUITE, 'TC-CO-02', '02_error-firstname-kosong');
  });

  test('TC-CO-03: Checkout gagal tanpa Last Name', async ({ page, checkoutPage }) => {
    await takeScreenshot(page, SUITE, 'TC-CO-03', '01_form-tanpa-lastname');
    await checkoutPage.fillInfo(CHECKOUT_INFO.VALID.firstName, '', CHECKOUT_INFO.VALID.postalCode);
    await checkoutPage.continue();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Last Name is required');
    await takeScreenshot(page, SUITE, 'TC-CO-03', '02_error-lastname-kosong');
  });

  test('TC-CO-04: Checkout gagal tanpa Postal Code', async ({ page, checkoutPage }) => {
    await takeScreenshot(page, SUITE, 'TC-CO-04', '01_form-tanpa-postalcode');
    await checkoutPage.fillInfo(CHECKOUT_INFO.VALID.firstName, CHECKOUT_INFO.VALID.lastName, '');
    await checkoutPage.continue();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain('Postal Code is required');
    await takeScreenshot(page, SUITE, 'TC-CO-04', '02_error-postalcode-kosong');
  });

  test('TC-CO-05: Verifikasi ringkasan order di step 2', async ({ page, checkoutPage }) => {
    await checkoutPage.fillInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    await checkoutPage.continue();
    await page.waitForURL(/.*checkout-step-two/);
    await expect(page.locator('.summary_info')).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.summary_total_label')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-CO-05', '01_ringkasan-order-step2');
  });

  test('TC-CO-06: Checkout selesai menampilkan halaman sukses', async ({ page, checkoutPage }) => {
    await checkoutPage.fillInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    await checkoutPage.continue();
    await page.waitForURL(/.*checkout-step-two/);
    await takeScreenshot(page, SUITE, 'TC-CO-06', '01_order-summary');
    await checkoutPage.finish();
    await expect(page).toHaveURL(/.*checkout-complete/);
    const completeMsg = await checkoutPage.getCompleteMessage();
    expect(completeMsg).toContain('Thank you for your order');
    await takeScreenshot(page, SUITE, 'TC-CO-06', '02_checkout-complete-sukses');
  });

  test('TC-CO-07: Tombol Cancel di step 1 kembali ke cart', async ({ page, checkoutPage }) => {
    await takeScreenshot(page, SUITE, 'TC-CO-07', '01_halaman-checkout-step1');
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(/.*cart/);
    await takeScreenshot(page, SUITE, 'TC-CO-07', '02_kembali-ke-cart');
  });

  test('TC-CO-08: Verifikasi tax dan total di order summary', async ({ page, checkoutPage }) => {
    await checkoutPage.fillInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    await checkoutPage.continue();
    await page.waitForURL(/.*checkout-step-two/);
    await expect(page.locator('.summary_subtotal_label')).toBeVisible();
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();
    await takeScreenshot(page, SUITE, 'TC-CO-08', '01_verifikasi-subtotal-tax-total');
  });
});
