import { expect, type Locator, type Page } from '@playwright/test';
import { toSauceProductSlug } from './product-utils.js';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('Products', { exact: true });
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.pageTitle).toBeVisible();
  }

  productName(productName: string): Locator {
    return this.page.getByText(productName, { exact: true });
  }

  addToCartButton(productName: string): Locator {
    return this.page.getByTestId(`add-to-cart-${toSauceProductSlug(productName)}`);
  }

  async addProductToCart(productName: string): Promise<void> {
    await expect(this.productName(productName)).toBeVisible();
    await this.addToCartButton(productName).click();
  }

  async sortBy(optionLabel: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: optionLabel });
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
