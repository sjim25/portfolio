import { expect, type Locator, type Page } from '@playwright/test';
import { toSauceProductSlug } from './product-utils.js';

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('Your Cart', { exact: true });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await expect(this.pageTitle).toBeVisible();
  }

  productName(productName: string): Locator {
    return this.page.getByText(productName, { exact: true });
  }

  removeButton(productName: string): Locator {
    return this.page.getByTestId(`remove-${toSauceProductSlug(productName)}`);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.productName(productName)).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.removeButton(productName).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
