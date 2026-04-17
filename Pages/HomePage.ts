import { Page, Locator } from "@playwright/test";
 
export class HomePage {
  readonly page: Page;
  readonly inputbox: Locator;
  readonly languageFilter: Locator;
  readonly levelFilter: Locator;
  readonly forEnterpriseLink: Locator;
  readonly forCampusLink: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.inputbox = page.locator("#search-autocomplete-input");
    this.languageFilter = page.getByTestId("filter-dropdown-language");
    this.levelFilter = page.getByTestId("filter-dropdown-productDifficultyLevel");
    this.forEnterpriseLink = page.locator("a.rc-SubFooterSection__content-column-link-text", { hasText: "For Enterprise" });
    this.forCampusLink = page.locator("a.rc-GlobalFooter_column_list_item_link", { hasText: "For Campus" });
  }
 
  async goto() {
    await this.page.goto("https://www.coursera.org");
    await this.page.waitForLoadState("domcontentloaded");
  }
 
  async searchCourse(courseName: string) {
    await this.inputbox.click();
    await this.inputbox.fill(courseName);
    await this.inputbox.press("Enter");
    await this.page.waitForLoadState("domcontentloaded");
  }
 
  async clickForEnterprise() {
    await this.forEnterpriseLink.scrollIntoViewIfNeeded();
    await this.forEnterpriseLink.waitFor({ state: "visible" });
    await this.forEnterpriseLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
 
  async clickForCampus() {
    //await this.forCampusLink.scrollIntoViewIfNeeded();
    await this.forCampusLink.waitFor({ state: "visible" });
    await this.forCampusLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}