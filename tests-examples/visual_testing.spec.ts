import { test, expect } from "@playwright/test";

test.describe("Visual Testing", () => {
  // First test to capture the baseline screenshot
  test("Plain screenshot captured of login page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page).toHaveScreenshot("login-page-screenshot.png");
    console.log("Baseline screenshot captured successfully.");
  });

  // Full page screenshot test
  test("Full page screenshot captured of login page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page).toHaveScreenshot("full-page-screenshot.png", { fullPage: true });
  });

  // Visual check of a specific element
  test("Visual check of login button", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toHaveScreenshot("login-button-screenshot.png");
  });

  // Masking sensitive information in screenshots
  test("Masked screenshot of login page", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page).toHaveScreenshot("login-info-masked.png", {
      fullPage: true,
      mask: [page.locator("#username"), page.locator("#password")],
    });
  });
});
