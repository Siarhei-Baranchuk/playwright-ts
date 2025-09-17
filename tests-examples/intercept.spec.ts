import { test, expect } from "@playwright/test";
import * as fs from "fs";

test.describe("Intercept API Requests", () => {
  // 1. Mock a successful API response to GET a user with a local JSON file
  test.only("GET user - mock with local file", async ({ page }) => {
    const mockUser = JSON.parse(fs.readFileSync("test-data/userMocked.json", "utf-8"));

    expect(mockUser.data.id).toBe(2);
    expect(mockUser.data.first_name).toBe("Test First Name");
    expect(mockUser.data.last_name).toBe("Test Last Name");

    await page.route("**/api/users/2", async (route) => {
      // Mock response with local JSON file
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockUser),
      });
    });

    await page.goto("https://reqres.in/");
    page.getByRole("link", { name: "Single user", exact: true }).click();

    console.log("Mock response (data):", mockUser);
  });

  // 2. Simulate a 404 error user is not found
  test("GET user - simulate 404 error", async ({ page }) => {
    //Intercept the request and respond with 404 error
    await page.route("**/api/users/2", async (route) => {
      await route.fulfill({
        status: 404,
        contentType: "application/json",
        body: JSON.stringify({ error: "User not found" }),
      });
    });

    const [response] = await Promise.all([
      page.waitForResponse("**/api/users/2"),
      page.goto("https://reqres.in/"),
      page.getByRole("link", { name: "Single user", exact: true }).click(),
    ]);

    expect(response.status()).toBe(404);
    const responseBody = await response.json();

    console.log("Response Body:-----", responseBody);
    console.log("Response Status:-----", response.status());

    expect(responseBody).toEqual({ error: "User not found" });
  });

  // 3. Block image requtests to speed up page load, styles, and fonts
  test("Block all images, styles, and fonts", async ({ page }) => {
    // Intercept requests and block images, styles, and fonts
    await page.route("**/*", (route) => {
      const resourceType = route.request().resourceType();

      if (["image", "stylesheet", "font"].includes(resourceType)) {
        console.log("Blocking resource:", route.request().url());
        route.abort();
      } else {
        route.continue();
      }
    });
    await page.goto("https://reqres.in/");
  });
});
