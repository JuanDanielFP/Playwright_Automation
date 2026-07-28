# Playwright Testing - Saucedemo

[![Playwright Tests](https://github.com/JuanDanielFP/Playwright_Automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/JuanDanielFP/Playwright_Automation/actions/workflows/playwright.yml)

Project **E2E Testing** menggunakan **Playwright** untuk website [Saucedemo](https://www.saucedemo.com).

## 📁 Struktur Project

```
D:\Playwright\
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD GitHub Actions Pipeline
├── .env                        # Environment Variables (Git-ignored)
├── .env.example                # Template Environment Variables
├── playwright.config.js        # Konfigurasi Playwright & Setup Dependencies
├── package.json                # Dependencies & scripts
├── tests/
│   ├── auth.setup.js           # Pre-authentication Setup (storageState)
│   ├── fixtures/
│   │   └── test.fixture.js     # Custom Playwright Fixtures (Dependency Injection)
│   ├── pages/
│   │   └── saucedemo.pages.js  # Page Object Model (POM)
│   ├── data/
│   │   └── test-data.js        # Test data & environment loader
│   ├── login.test.js           # Test Login (7 TC)
│   ├── inventory.test.js       # Test Inventory (10 TC)
│   ├── cart.test.js            # Test Cart (7 TC)
│   ├── checkout.test.js        # Test Checkout (8 TC)
│   ├── e2e.test.js             # End-to-End Test (4 TC)
│   └── visual.test.js          # Visual Regression / Snapshot Testing (4 TC)
└── playwright-report/          # HTML Report (auto-generated)
```

## 🚀 Cara Menjalankan

### Install browser (wajib pertama kali)
```bash
npm run install:browsers
```

### Jalankan semua test
```bash
npm test
```

### Jalankan dengan tampilan browser (headed)
```bash
npm run test:headed
```

### Jalankan test per modul
```bash
npm run test:login       # Test login saja
npm run test:inventory   # Test inventory saja
npm run test:cart        # Test cart saja
npm run test:checkout    # Test checkout saja
npm run test:e2e         # End-to-end test
npm run test:visual      # Visual regression test
npm run test:visual:update # Update baseline snapshots
```

### Jalankan per browser
```bash
npm run test:chromium    # Chrome
npm run test:firefox     # Firefox
npm run test:webkit      # Safari
npm run test:mobile      # Mobile (Pixel 5)
```

### Mode debug & UI
```bash
npm run test:debug       # Mode step-by-step debug
npm run test:ui          # Playwright UI Mode
```

### Lihat laporan (Reporting)
```bash
# Playwright HTML Report
npm run report

# Allure Report (Generate & buka di browser)
npm run allure:generate
npm run allure:open

# Atau buka Allure Report secara instan (Serve Mode)
npm run allure:serve
```

## 📋 Daftar Test Cases

| Suite | Test Case | Deskripsi |
|-------|-----------|-----------|
| Login | TC-LOGIN-01 | Login berhasil dengan standard_user |
| Login | TC-LOGIN-02 | Login gagal - user locked |
| Login | TC-LOGIN-03 | Login gagal - kredensial invalid |
| Login | TC-LOGIN-04 | Login gagal - tanpa username |
| Login | TC-LOGIN-05 | Login gagal - tanpa password |
| Login | TC-LOGIN-06 | Verifikasi elemen UI |
| Login | TC-LOGIN-07 | Login dengan performance_glitch_user |
| Inventory | TC-INV-01 | Menampilkan 6 produk |
| Inventory | TC-INV-02 | Judul halaman "Products" |
| Inventory | TC-INV-03 | Sort A-Z |
| Inventory | TC-INV-04 | Sort Z-A |
| Inventory | TC-INV-05 | Sort harga rendah-tinggi |
| Inventory | TC-INV-06 | Sort harga tinggi-rendah |
| Inventory | TC-INV-07 | Add to cart - badge bertambah |
| Inventory | TC-INV-08 | Tambah multiple produk |
| Inventory | TC-INV-09 | Tombol berubah ke "Remove" |
| Inventory | TC-INV-10 | Buka detail produk |
| Cart | TC-CART-01 | Cart kosong saat masuk |
| Cart | TC-CART-02 | Produk muncul di cart |
| Cart | TC-CART-03 | Multiple produk di cart |
| Cart | TC-CART-04 | Hapus produk dari cart |
| Cart | TC-CART-05 | Continue Shopping |
| Cart | TC-CART-06 | Menuju halaman checkout |
| Cart | TC-CART-07 | Cart badge hilang |
| Checkout | TC-CO-01 | Checkout dengan data valid |
| Checkout | TC-CO-02 | Gagal tanpa First Name |
| Checkout | TC-CO-03 | Gagal tanpa Last Name |
| Checkout | TC-CO-04 | Gagal tanpa Postal Code |
| Checkout | TC-CO-05 | Verifikasi order summary |
| Checkout | TC-CO-06 | Checkout selesai - halaman sukses |
| Checkout | TC-CO-07 | Cancel kembali ke cart |
| Checkout | TC-CO-08 | Verifikasi tax dan total |
| E2E | TC-E2E-01 | Full purchase flow |
| E2E | TC-E2E-02 | Login dan Logout |
| E2E | TC-E2E-03 | Proteksi halaman inventory |
| E2E | TC-E2E-04 | Sort dan beli produk termurah |

**Total: 36 Test Cases**

## 🔑 Test Users (Saucedemo)

| Username | Password | Keterangan |
|----------|----------|------------|
| `standard_user` | `secret_sauce` | User normal |
| `locked_out_user` | `secret_sauce` | User dikunci |
| `problem_user` | `secret_sauce` | User bermasalah |
| `performance_glitch_user` | `secret_sauce` | User lambat |

## 🌐 Browser yang Didukung
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)

## ⚙️ CI/CD Pipeline (GitHub Actions)
Project ini dilengkapi dengan **GitHub Actions Workflow** (`.github/workflows/playwright.yml`).
- **Otomatisasi**: Dijalankan secara otomatis setiap kali ada `push` atau `pull_request` ke branch `main`/`master`.
- **Artifacts**: Mengunggah *Playwright HTML Report* secara otomatis setelah eksekusi selesai yang dapat diunduh dari tab **Actions** di GitHub.

