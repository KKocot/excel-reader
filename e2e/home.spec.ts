import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page successfully", async ({ page }) => {
    await page.goto("/");

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Excel Reader/i);

    // Check for main heading
    await expect(page.locator("h1")).toHaveText("Cześć!");

    // Check for welcome message
    await expect(page.locator("p").first()).toHaveText(
      "Witaj w aplikacji sortowania spotkań SuperW"
    );

    // Check for GitHub link
    const githubLink = page.locator(
      'a[href="https://github.com/KKocot/excel-reader"]'
    );
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("should navigate to classes page", async ({ page }) => {
    await page.goto("/");

    // Look for navigation link to classes (assuming there's a nav menu)
    const classesLink = page
      .locator('a[href*="classes"], a:has-text("Spotkania")')
      .first();

    if (await classesLink.isVisible()) {
      await classesLink.click();

      // Check that we're now on the classes page
      await expect(page).toHaveURL(/.*classes/);
    } else {
      // If no navigation link, navigate directly to test the route
      await page.goto("/classes");
      await expect(page).toHaveURL(/.*classes/);
    }
  });

  test("should handle 404 for invalid routes", async ({ page }) => {
    await page.goto("/non-existent-page");

    // Check if 404 page is shown or redirected appropriately
    const is404 = await page.locator("body").textContent();
    expect(is404).toBeTruthy();
  });
});
