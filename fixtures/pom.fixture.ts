// We are creating a Playwright fixture that initializes a page object manager (PomManager) for each test.

import { test as base } from "@playwright/test";
import PomManager from "../pages/ManagePage";

type MyFixtures = {
  pm: PomManager;
};

export const test = base.extend<MyFixtures>({
  // Re-use Playwright’s default `page`
  pm: async ({ page }, use) => {
    await use(new PomManager(page));
  },
});

export { expect } from "@playwright/test";
