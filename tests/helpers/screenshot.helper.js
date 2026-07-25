const fs = require('fs');
const path = require('path');

/**
 * Helper untuk mengambil screenshot sebagai evidence test
 * Screenshot disimpan di: screenshots/<suite>/<TC-ID>_<step>_<description>.png
 */

/**
 * Ambil screenshot dengan nama terorganisir
 * @param {import('@playwright/test').Page} page
 * @param {string} suite - nama folder (login, inventory, cart, checkout, e2e)
 * @param {string} tcId  - ID test case, misal: TC-LOGIN-01
 * @param {string} step  - nama step, misal: 01_login-page
 */
async function takeScreenshot(page, suite, tcId, step) {
  const screenshotDir = path.join('screenshots', suite);
  
  // Buat folder jika belum ada
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const filename = `${tcId}_${step}.png`;
  const filePath = path.join(screenshotDir, filename);

  await page.screenshot({
    path: filePath,
    fullPage: true,
  });

  console.log(`📸 Screenshot: ${filePath}`);
}

/**
 * Ambil screenshot saat terjadi error/assertion
 */
async function takeErrorScreenshot(page, suite, tcId) {
  await takeScreenshot(page, suite, tcId, '99_ERROR');
}

module.exports = { takeScreenshot, takeErrorScreenshot };
