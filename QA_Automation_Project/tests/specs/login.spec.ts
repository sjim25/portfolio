import { test } from '../fixtures/test-fixtures.js';

test.describe('Login', () => {
  test('standard user can sign in', async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login();

    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error message', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await loginPage.expectLoginError('Sorry, this user has been locked out.');
  });
});
