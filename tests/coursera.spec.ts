import { test, expect } from "@playwright/test";
import { HomePage } from "../Pages/HomePage";
import { SearchResultsPage } from "../Pages/SearchResultsPage";
import { CampusFormPage } from "../Pages/CampusFormPage";
 
test("Coursera Project", async ({ page }) => {
  test.setTimeout(600000);
 
  const home = new HomePage(page);
  const searchResults = new SearchResultsPage(page);
  const campusForm = new CampusFormPage(page);
 
  await home.goto();
  await home.searchCourse("Web Development");
  await page.screenshot({ path: `screenshots/search-results.png` });
 
  const englishCount = await searchResults.filterByLanguage("English");
  const beginnerCount = await searchResults.filterByLevel("Beginner");
 
  await searchResults.getCardDetails(2);
  await page.screenshot({ path: `screenshots/filtered-courses.png`, fullPage: true });
 
  console.log("==========================================");
  console.log(`✅ Total Courses in English Language : ${englishCount}`);
  console.log(`✅ Total Courses at Beginner Level   : ${beginnerCount}`);
  console.log("==========================================");
 
  await home.goto();
  await home.clickForEnterprise();
  console.log("✅ Navigated to Enterprise:", page.url());
 
  await home.clickForCampus();
  console.log("✅ Navigated to Campus:", page.url());
 
  await campusForm.fillForm();
});