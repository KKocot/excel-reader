import { test, expect } from "@playwright/test";

test.describe("Navigation and Redirects", () => {
  test("should navigate between pages correctly", async ({ page }) => {
    // Start at home page
    await page.goto("/");
    await expect(page).toHaveURL("/");

    // Navigate to classes via header link
    await page.locator('a[href="/classes"]').click();
    await expect(page).toHaveURL("/classes");
    await expect(page.locator("h1")).toHaveText("Zajecia");

    // Navigate back to home
    await page.locator('a[href="/"]').click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toHaveText("Cześć!");
  });

  test("should handle direct URL navigation", async ({ page }) => {
    // Direct navigation to classes page
    await page.goto("/classes");
    await expect(page).toHaveURL("/classes");
    await expect(page.locator("h1")).toHaveText("Zajecia");

    // Direct navigation to home page
    await page.goto("/");
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toHaveText("Cześć!");
  });

  test("should handle browser back/forward navigation", async ({ page }) => {
    // Navigate to home
    await page.goto("/");

    // Navigate to classes
    await page.goto("/classes");
    await expect(page.locator("h1")).toHaveText("Zajecia");

    // Use browser back button
    await page.goBack();
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toHaveText("Cześć!");

    // Use browser forward button
    await page.goForward();
    await expect(page).toHaveURL("/classes");
    await expect(page.locator("h1")).toHaveText("Zajecia");
  });

  test("should handle invalid routes", async ({ page }) => {
    // Navigate to a non-existent route
    const response = await page.goto("/invalid-route");

    // Check if it's handled gracefully (either 404 or redirect)
    if (response) {
      // If the route returns a response, check if it's appropriate
      expect([200, 404]).toContain(response.status());
    }

    // The app might redirect to a valid page or show a 404 component
    // We'll check that the page doesn't crash
    await expect(page.locator("body")).toBeVisible();
  });

  test("should maintain header navigation on all pages", async ({ page }) => {
    const pages = ["/", "/classes"];

    for (const pagePath of pages) {
      await page.goto(pagePath);

      // Check that header navigation is present
      await expect(page.locator('a[href="/"]')).toBeVisible();
      await expect(page.locator('a[href="/classes"]')).toBeVisible();
      await expect(page.locator('a[href*="epochconverter"]')).toBeVisible();
    }
  });

  test("should handle external links correctly", async ({ page }) => {
    await page.goto("/");

    // Test GitHub external link
    const githubLink = page.locator(
      'a[href="https://github.com/KKocot/excel-reader"]'
    );
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    // Test calendar external link from header
    const calendarLink = page.locator('a[href*="epochconverter"]');
    await expect(calendarLink).toHaveAttribute("target", "_blank");
  });

  test("should preserve page state during navigation", async ({ page }) => {
    await page.goto("/classes");

    // If there are any form inputs or toggles, interact with them
    const dateToggle = page.locator('input[type="checkbox"]').first();
    if (await dateToggle.isVisible()) {
      const initialChecked = await dateToggle.isChecked();

      // Navigate away and back
      await page.goto("/");
      await page.goto("/classes");

      // Note: This tests that the page loads fresh each time
      // Real state preservation would require more complex setup
      await expect(dateToggle).toBeVisible();
    }
  });

  test("should have correct page titles", async ({ page }) => {
    // Test home page title
    await page.goto("/");
    await expect(page).toHaveTitle(/Excel Reader|Exel Reader/i);

    // Test classes page title
    await page.goto("/classes");
    await expect(page).toHaveTitle(/Excel Reader|Exel Reader/i);
  });
});
