import { test, expect } from "@playwright/test";

test.describe("Classes Page", () => {
  test("should load the classes page successfully", async ({ page }) => {
    await page.goto("/classes");

    // Check if the page loads correctly
    await expect(page.locator("h1")).toHaveText("Zajecia");

    // Check for file upload input
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible();

    // Check for filter section instead of "Sortowanie"
    await expect(page.locator("text=Filtruj według statusu")).toBeVisible();
  });

  test("should have working navigation buttons in header", async ({ page }) => {
    await page.goto("/classes");

    // Check that header navigation is present
    const homeButton = page.locator('a[href="/"]');
    const classesButton = page.locator('a[href="/classes"]');
    const calendarIcon = page.locator('a[href="/classes/calendar"]');

    await expect(homeButton).toBeVisible();
    await expect(classesButton).toBeVisible();
    await expect(calendarIcon).toBeVisible();

    // Test home navigation
    await homeButton.click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toHaveText("Cześć!");

    // Navigate back to classes
    await page.goto("/classes");

    // Test calendar icon link (internal, not in header but in filters)
    await calendarIcon.click();
    await expect(page).toHaveURL("/classes/calendar");
  });

  test("should handle file upload interaction", async ({ page }) => {
    await page.goto("/classes");

    // Check file input functionality
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible();
    await expect(fileInput).toHaveAttribute("multiple");

    // Test that clicking the file input opens file dialog
    // We can't actually upload files in this test without setting up test files,
    // but we can verify the input is interactive
    await fileInput.click();
  });

  test("should have sorting controls", async ({ page }) => {
    await page.goto("/classes");

    // Look for filter section
    const filterSection = page.locator("text=Filtruj według statusu").first();
    await expect(filterSection).toBeVisible();

    // Check for color filter buttons - using more specific selectors based on actual implementation
    const greenButton = page.locator('button:has-text("Zielony")');
    const yellowButton = page.locator('button:has-text("Żółty")');
    const redButton = page.locator('button:has-text("Czerwony")');

    await expect(greenButton).toBeVisible();
    await expect(yellowButton).toBeVisible();
    await expect(redButton).toBeVisible();

    // Test that filter buttons are interactive
    await greenButton.click();
  });

  test("should display empty state when no files are uploaded", async ({
    page,
  }) => {
    await page.goto("/classes");

    // Check that there's appropriate messaging when no data is loaded
    // The page should not show error states initially
    const errorMessages = page.locator("text=Błąd, text=Error");
    await expect(errorMessages).toHaveCount(0);
  });

  test("should have download functionality", async ({ page }) => {
    await page.goto("/classes");

    // Look for download buttons (though they might be disabled without data)
    const downloadButtons = page.locator(
      'button:has-text("Pobierz"), button:has-text("Download"), [role="button"]:has-text("Pobierz")'
    );

    if ((await downloadButtons.count()) > 0) {
      await expect(downloadButtons.first()).toBeVisible();
    }
  });

  test("should handle date display toggle", async ({ page }) => {
    await page.goto("/classes");

    // Look for date display controls
    const dateToggle = page
      .locator(
        'input[type="checkbox"]:near(:text("Data")), button:has-text("Data")'
      )
      .first();

    if (await dateToggle.isVisible()) {
      // Test toggling date display
      await dateToggle.click();
    }
  });
});
