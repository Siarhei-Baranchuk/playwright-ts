import { BasePage } from "./BasePage";
import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

// This page is using reusable locators and requires a constructor
export class CheckboxesPage extends BasePage {
  // Declare reusable locators for checkboxes
  protected readonly firstBox: Locator;
  protected readonly secondBox: Locator;
  protected readonly form: Locator;

  constructor(page: Page) {
    // Call the constructor of the BasePage class to make this.page available
    super(page);
    // Initialize reusable locators
    this.firstBox = page.locator("form#checkboxes input").nth(0);
    this.secondBox = page.locator("form#checkboxes input").nth(1);
    this.form = page.locator("form#checkboxes");
  }

  /** Navigate to page and verify form is visible. */
  async openCheckboxesPage() {
    await this.goToUrl("/checkboxes");
    await this.basePageExpectVisible(this.form);
  }

  async checkFirstCheckbox() {
    await this.firstBox.check();
  }

  async uncheckFirstCheckbox() {
    await this.firstBox.uncheck();
  }

  async checkSecondCheckbox() {
    await this.secondBox.check();
  }

  async uncheckSecondCheckbox() {
    await this.secondBox.uncheck();
  }

  /** Validate expected checked / unchecked state. */
  async assertCheckboxesState(isFirstChecked: boolean, isSecondChecked: boolean) {
    await expect(this.firstBox).toBeChecked({ checked: isFirstChecked });
    await expect(this.secondBox).toBeChecked({ checked: isSecondChecked });
  }
}
