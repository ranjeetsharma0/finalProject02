# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: coursera.spec.ts >> Coursera Platform Tests >> Verify campus form with second test data set @regression
- Location: tests\coursera.spec.ts:61:8

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://www.coursera.org/", waiting until "load"

```

# Test source

```ts
  1  | import { Page, Locator } from "@playwright/test";
  2  |  
  3  | export class HomePage {
  4  |   readonly page: Page;
  5  |   readonly inputbox: Locator;
  6  |   readonly languageFilter: Locator;
  7  |   readonly levelFilter: Locator;
  8  |   readonly forEnterpriseLink: Locator;
  9  |   readonly forCampusLink: Locator;
  10 |  
  11 |   constructor(page: Page) {
  12 |     this.page = page;
  13 |     this.inputbox = page.locator("#search-autocomplete-input");
  14 |     this.languageFilter = page.getByTestId("filter-dropdown-language");
  15 |     this.levelFilter = page.getByTestId("filter-dropdown-productDifficultyLevel");
  16 |     this.forEnterpriseLink = page.locator("a.rc-SubFooterSection__content-column-link-text", { hasText: "For Enterprise" });
  17 |     this.forCampusLink = page.locator("a.rc-GlobalFooter_column_list_item_link", { hasText: "For Campus" });
  18 |   }
  19 |  
  20 |   async goto() {
> 21 |     await this.page.goto("https://www.coursera.org");
     |                     ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  22 |     await this.page.waitForLoadState("domcontentloaded");
  23 |   }
  24 |  
  25 |   async searchCourse(courseName: string) {
  26 |     await this.inputbox.click();
  27 |     await this.inputbox.fill(courseName);
  28 |     await this.inputbox.press("Enter");
  29 |     await this.page.waitForLoadState("domcontentloaded");
  30 |   }
  31 |  
  32 |   async clickForEnterprise() {
  33 |     await this.forEnterpriseLink.scrollIntoViewIfNeeded();
  34 |     await this.forEnterpriseLink.waitFor({ state: "visible" });
  35 |     await this.forEnterpriseLink.click();
  36 |     await this.page.waitForLoadState("domcontentloaded");
  37 |   }
  38 |  
  39 |   async clickForCampus() {
  40 |     //await this.forCampusLink.scrollIntoViewIfNeeded();
  41 |     await this.forCampusLink.waitFor({ state: "visible" });
  42 |     await this.forCampusLink.click();
  43 |     await this.page.waitForLoadState("domcontentloaded");
  44 |   }
  45 | }
```