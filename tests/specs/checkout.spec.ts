import { test } from '../fixtures/test-fixtures.js';

test.describe('Checkout', () => {
  test('user can complete an order', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.open();
    await loginPage.login();
    await inventoryPage.expectLoaded();

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectProductVisible('Sauce Labs Backpack');

    await cartPage.checkout();
    await checkoutPage.fillCustomerInformation({
      firstName: 'QA',
      lastName: 'Engineer',
      postalCode: '12345'
    });
    await checkoutPage.expectOverviewLoaded();
    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderComplete();
  });
});
