import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

// this page is using inline locators, inline locators are defined directly in the methods, not as class properties.
export class LoginPage extends BasePage {
  /* public business actions */
  async openLoginPage() {
    await this.goToUrl("/login");
  }

  async userLogin(username: string, password: string) {
    // Fill username and password fields using helper from BasePage:
    await this.basePageFill(this.page.getByLabel("Username"), username); // playwright selector
    await this.basePageFill("#password", password); // CSS selector
    await this.basePageClick('xpath=//button[contains(., "Login")]'); // XPath selector
  }

  // Assert failed login message
  async assertFailedUsername() {
    await this.basePageExpectVisible(this.page.locator("#flash"));
    // if needed you can use playwright's api directly instead of basePage methods
    await expect(this.page.locator("#flash")).toContainText("Your username is invalid!");
  }
}
