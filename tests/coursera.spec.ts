import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";
import { SearchResultsPage } from "../Pages/SearchResultsPage";
import { CampusFormPage } from "../Pages/CampusFormPage";

test.describe("Coursera Platform Tests", () => {
  let home: HomePage, searchResults: SearchResultsPage, campusForm: CampusFormPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    searchResults = new SearchResultsPage(page);
    campusForm = new CampusFormPage(page);
    await home.goto();
  });

  /**
   * SMOKE TEST: High-level health check. 
   * Ensures the core search functionality isn't broken.
   */
  test("Verify basic search functionality @smoke", async ({ page }) => {
  await home.searchCourse("Web Development");
  
  // Get the string value from your method
  const countString = await searchResults.filterByLanguage("English"); 
  
  // Remove commas and convert to Number
  if (!countString) {
    throw new Error("countString is undefined");
  }
  const count = Number(countString!.replace(/,/g, ''));

  expect(count).toBeGreaterThan(0);
});

  /**
   * REGRESSION TEST: Detailed validation.
   * Ensures that filters, navigation, and forms work as expected after updates.
   */
  test("Verify advanced filters and enterprise navigation @regression", async ({ page }) => {
    // 1. Filter Validation
    await home.searchCourse("Web Development");
    const englishCount = await searchResults.filterByLanguage("English");
    const beginnerCount = await searchResults.filterByLevel("Beginner");
    
    expect(englishCount).not.toBeNull();
    expect(beginnerCount).not.toBeNull();

    // 2. Navigation & Form Validation
    await home.clickForEnterprise();
    expect(page.url()).toContain("enterprise");

    await home.clickForCampus();
    await campusForm.fillForm();
    // Add an assertion here for form success (e.g., success message visibility)
  });
});