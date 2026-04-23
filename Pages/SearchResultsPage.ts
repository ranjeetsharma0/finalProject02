// Import Playwright Page class for browser automation
import { Page } from "@playwright/test";

// Page Object Model class for Coursera search results page
export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Filters search results by language and returns the matching course count
  async filterByLanguage(language: string) {
    await this.page.getByTestId("filter-dropdown-language").click();
    await this.page.getByRole("checkbox", { name: language }).click();
    await this.page.waitForSelector("[data-testid='search-filter-group-Language']");
    // Extracts count from element (format: "(123)") and cleans it to return as number string
    const countRaw = await this.page.locator(`[data-testid='language:${language}-true'] span.css-s63saa`).textContent();
    await this.page.getByTestId("filter-view-button").click();
    return countRaw?.replace(/[()]/g, "").trim();
  }

  // Filters search results by difficulty level and returns the matching course count
  async filterByLevel(level: string) {
    await this.page.getByTestId("filter-dropdown-productDifficultyLevel").click();
    await this.page.getByRole("checkbox", { name: level }).click();
    await this.page.waitForSelector("[data-testid='search-filter-group-Level']");
    // Extracts count from element (format: "(456)") and cleans it to return as number string
    const countRaw = await this.page.locator(`[data-testid='productDifficultyLevel:${level}-true'] span.css-s63saa`).textContent();
    await this.page.getByTestId("filter-view-button").click();
    return countRaw?.replace(/[()]/g, "").trim();
  }

  // Extracts and logs course card details (title, rating, level/duration) from search results
  async getCardDetails(limit: number = 2) {
    await this.page.waitForSelector("[data-testid='product-card-cds']");
    // Collect all course information from the card elements
    const titles = await this.page.locator("h3.cds-CommonCard-title").allTextContents();
    const ratings = await this.page.locator(".cds-RatingStat-sizeLabel .css-4s48ix").allTextContents();
    const metadata = await this.page.locator(".cds-CommonCard-metadata p.css-vac8rf").allTextContents();

    // Log details for each card up to the specified limit
    for (let i = 0; i < limit; i++) {
      console.log(`Card ${i + 1} title: ${titles[i]}`);
      console.log(`Card ${i + 1} rating: ${ratings[i]}`);
      console.log(`Card ${i + 1} level/duration: ${metadata[i]}`);
      console.log("-----");
    }
  }
}