// BasePage stores Playwright `Page` instance. Class is protected, so only extending classes can access it.
import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Navigate to a specific URL path. */
  protected async goToUrl(path: string) {
    await this.page.goto(path);
  }

  /* ── Low-level helpers (protected) ── */
  protected async basePageClick(selector: string | Locator) {
    await this.toLocator(selector).click();
  }

  protected async basePageFill(selector: string | Locator, value: string) {
    await this.toLocator(selector).fill(value);
  }

  protected async basePageExpectVisible(selector: string | Locator) {
    await expect(this.toLocator(selector)).toBeVisible();
  }

  /** Quick helper for tests:
   * If you need a quick selector in a .spec test file
   * This will keep `page` protected but lets grab elements without adding a dedicated method for every page.
   */
  public locator(selector: string | Locator): Locator {
    return this.toLocator(selector);
  }

  /** Cast a string selector or Locator-like object to a Locator. */
  protected toLocator(selector: string | Locator): Locator {
    return typeof selector === "string"
      ? this.page.locator(selector) // string → Locator
      : selector; // already a Locator
  }
}
