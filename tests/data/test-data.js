/**
 * Test data constants untuk Saucedemo
 */

const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  INVALID: {
    username: 'invalid_user',
    password: 'wrong_password',
  },
};

const URLS = {
  BASE: 'https://www.saucedemo.com',
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
