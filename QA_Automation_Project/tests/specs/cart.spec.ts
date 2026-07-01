import { expect, test } from '../fixtures/test-fixtures.js';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login();
    await inventoryPage.expectLoaded();
  });

  test('user can add multiple products to the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');
    await inventoryPage.expectCartCount(2);

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectProductVisible('Sauce Labs Backpack');
    await cartPage.expectProductVisible('Sauce Labs Bike Light');
  });

  test('user can remove a product from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.expectLoaded();

    await cartPage.removeProduct('Sauce Labs Backpack');

    await expect(cartPage.productName('Sauce Labs Backpack')).toBeHidden();
  });
});
