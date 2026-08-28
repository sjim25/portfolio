export function toSauceProductSlug(productName: string): string {
  return productName.toLowerCase().replaceAll(' ', '-');
}
