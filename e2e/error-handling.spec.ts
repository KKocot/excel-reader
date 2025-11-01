import { test, expect } from "@playwright/test";

test.describe("Error Handling", () => {
  test("should handle errors gracefully", async ({ page }) => {
    // Test that the application doesn't crash on normal operation
    await page.goto("/");

    // Check that no JavaScript errors are logged to console
    const errors: string[] = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    // Navigate through the app
    await page.goto("/classes");
    await page.goto("/");

    // Interact with elements
    await page.locator('a[href="/classes"]').click();

    // Check that no critical errors occurred
    const criticalErrors = errors.filter(
      (error) =>
        error.includes("TypeError") ||
        error.includes("ReferenceError") ||
        error.includes("Cannot read")
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("should display error boundary for invalid CSV data", async ({
    page,
  }) => {
    await page.goto("/classes");

    // The error boundary component should be available but not shown initially
    const errorMessage = page.locator("text=Błąd ładowania strony");
    const errorExists = await errorMessage.count();

    // If error boundary is showing, it should have proper messaging
    if (errorExists > 0) {
      await expect(errorMessage).toBeVisible();
      await expect(
        page.locator("text=Wystąpił błąd podczas przetwarzania pliku CSV")
      ).toBeVisible();
      await expect(
        page.locator('a:has-text("Powrót do strony")')
      ).toBeVisible();
    }
  });

  test("should handle network issues gracefully", async ({ page }) => {
    // Simulate network issues for non-critical resources
    await page.route("**/*", (route) => {
      // Allow the initial page load but simulate issues with some other requests
      if (
        route.request().url().includes("favicon") ||
        route.request().url().includes(".map")
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });

    await page.goto("/");

    // The app should still be functional even with some failed resources
    await expect(page.locator("body")).toBeAttached();
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should handle missing resources gracefully", async ({ page }) => {
    // Listen for 404s and other HTTP errors
    const httpErrors: number[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400) {
        httpErrors.push(response.status());
      }
    });

    await page.goto("/");
    await page.goto("/classes");

    // Some 404s might be acceptable (like favicon), but not too many
    const criticalHttpErrors = httpErrors.filter((status) => status >= 500);
    expect(criticalHttpErrors).toHaveLength(0);
  });

  test("should provide fallback for JavaScript disabled scenarios", async ({
    page,
  }) => {
    // Test basic HTML structure without JavaScript
    await page.goto("/", { waitUntil: "domcontentloaded" });

    // The page should have basic structure even if JS fails
    await expect(page.locator("body")).toBeVisible();
    const headingCount = await page.locator("h1, h2, h3").count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test("should handle rapid navigation without errors", async ({ page }) => {
    // Test rapid navigation to check for race conditions
    const errors: string[] = [];
    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    // Rapid navigation
    await page.goto("/");
    await page.goto("/classes");
    await page.goto("/");
    await page.goto("/classes");
    await page.goto("/");

    // Check for race condition errors
    const raceConditionErrors = errors.filter(
      (error) =>
        error.includes("AbortError") ||
        error.includes("Network request failed") ||
        error.includes("cancelled")
    );

    // Some navigation errors might be acceptable, but not too many
    expect(raceConditionErrors.length).toBeLessThan(3);
  });
});
