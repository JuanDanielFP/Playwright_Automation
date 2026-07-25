/**
 * Test data constants untuk Saucedemo
 * Mendukung pembacaan dari environment variables (.env) dengan fallback default.
 */
require('dotenv').config();

const USERS = {
  STANDARD: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.STANDARD_PASSWORD || 'secret_sauce',
  },
  LOCKED_OUT: {
    username: process.env.LOCKED_OUT_USER || 'locked_out_user',
    password: process.env.STANDARD_PASSWORD || 'secret_sauce',
  },
  PROBLEM: {
    username: process.env.PROBLEM_USER || 'problem_user',
    password: process.env.STANDARD_PASSWORD || 'secret_sauce',
  },
  PERFORMANCE_GLITCH: {
    username: process.env.PERFORMANCE_GLITCH_USER || 'performance_glitch_user',
    password: process.env.STANDARD_PASSWORD || 'secret_sauce',
  },
  INVALID: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

const URLS = {
  BASE: process.env.BASE_URL || 'https://www.saucedemo.com',
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  CHECKOUT_STEP_TWO: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
};

const MESSAGES = {
  LOGIN_ERROR_LOCKED: 'Epic sadface: Sorry, this user has been locked out.',
  LOGIN_ERROR_INVALID: 'Epic sadface: Username and password do not match any user in this service',
  LOGIN_ERROR_NO_USERNAME: 'Epic sadface: Username is required',
  LOGIN_ERROR_NO_PASSWORD: 'Epic sadface: Password is required',
  CHECKOUT_COMPLETE: 'Thank you for your order!',
};

const CHECKOUT_INFO = {
  VALID: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
};

module.exports = { USERS, URLS, MESSAGES, CHECKOUT_INFO };
