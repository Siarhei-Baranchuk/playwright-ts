import { test, expect } from "../fixtures/pom.fixture";

test.describe("Login flow", () => {
  test("should login with valid credentials", async ({ pm }) => {
    await pm.loginPage.openLoginPage();
    await pm.loginPage.userLogin("tomsmith", "SuperSecretPassword!");
    await pm.securePage.assertSuccess();
  });

  test("should show error for invalid credentials", async ({ pm }) => {
    await pm.loginPage.openLoginPage();
    await pm.loginPage.userLogin("badUser", "badPass");
    await pm.loginPage.assertFailedUsername();
  });
});
