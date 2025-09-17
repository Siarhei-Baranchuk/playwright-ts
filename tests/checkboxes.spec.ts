import { test, expect } from "../fixtures/pom.fixture";

test.describe("Checkboxes page", () => {
  test("mix POM helpers and raw page actions", async ({ pm, page }) => {
    await pm.checkboxesPage.openCheckboxesPage();
    await pm.checkboxesPage.checkFirstCheckbox();

    await expect(page).toHaveScreenshot("checkboxes-after-check.png");

    await expect(pm.checkboxesPage.locator("form#checkboxes")).toBeVisible();
  });

  test("uncheck both checkboxes", async ({ pm }) => {
    await pm.checkboxesPage.openCheckboxesPage();
    await pm.checkboxesPage.uncheckFirstCheckbox();
    await pm.checkboxesPage.uncheckSecondCheckbox();
    await pm.checkboxesPage.assertCheckboxesState(false, false);
  });
});
