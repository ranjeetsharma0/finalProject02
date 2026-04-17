import { Page } from "@playwright/test";
import formData from "../test-data/campusFormData.json";

export class CampusFormPage {
  readonly page: Page;

  // ✅ Updated arrays matching actual DOM selectors from screenshots
  institutionTypeArray: { value: string; text: string }[] = [];  // was organizationTypeArray (#rentalField9 ❌)
  titleArray: { value: string; text: string }[] = [];            // was companySizeArray (#Employee_Range__c ❌)
  departmentArray: { value: string; text: string }[] = [];
  countryArray: { value: string; text: string }[] = [];

  constructor(page: Page) {
    this.page = page;
  }

  async fillForm() {
    await this.page.waitForSelector('input[name="FirstName"]');

    await this.page.locator('input[name="FirstName"]').fill(formData.firstName);
    await this.page.locator('input[name="LastName"]').fill(formData.lastName);
    await this.page.locator('input[name="Phone"]').fill(formData.phone);
    await this.page.locator('input[name="Email"]').fill(formData.email);
    await this.page.locator('input[name="Company"]').fill(formData.company);

    await this.page.selectOption("#Institution_Type__c", formData.institutionType);
    await this.page.selectOption("#Title", formData.title);
    await this.page.selectOption("#Department", formData.department);
    await this.page.selectOption("#Self_Reported_Needs__c", formData.selfReportedNeeds);
    await this.page.selectOption("#Country", formData.country);

    await this.extractDropdownValues();

    await this.page.screenshot({ path: "screenshots/form-filled.png" });

    await this.page.locator("button:has-text('Submit')").click();
    await this.page.waitForTimeout(2000);

    await this.page.screenshot({ path: "screenshots/form-submitted.png" });

    await this.checkForErrors();
  }

  // ✅ Updated to use correct selectors from screenshots
  async extractDropdownValues() {
    this.institutionTypeArray = await this.getOptions("#Institution_Type__c");  // screenshot 2 ✅
    this.titleArray           = await this.getOptions("#Title");                // screenshot 1 ✅
    this.departmentArray      = await this.getOptions("#Department");           // screenshot 3 ✅
    this.countryArray         = await this.getOptions("#Country");

    console.log("Institution Type Array:", this.institutionTypeArray);
    console.log("Title Array:", this.titleArray);
    console.log("Department Array:", this.departmentArray);
    console.log("Country Array:", this.countryArray);
  }

  private async getOptions(selector: string) {
    const element = this.page.locator(selector);
    const elementCount = await element.count();

    if (elementCount === 0) {
      console.warn(`⚠️ Selector NOT FOUND in DOM: ${selector}`);
      return [];
    }

    const options = this.page.locator(`${selector} option`);
    const count = await options.count();

    if (count === 0) return [];

    return await options.evaluateAll(opts =>
      opts.map(o => ({
        value: o.getAttribute("value") || "",
        text: o.textContent?.trim() || ""
      }))
    );
  }

  async checkForErrors() {
    const errorElements = this.page.locator(".mktoErrorMsg");
    const errorCount = await errorElements.count();

    if (errorCount > 0) {
      for (let i = 0; i < errorCount; i++) {
        const el = errorElements.nth(i);
        if (await el.isVisible()) {
          console.log(await el.innerText());
        }
      }
    }
  }

  private getFieldNameFromId(id: string | null): string {
    const fieldMap: Record<string, string> = {
      ValidMsgEmail: "Email",
      ValidMsgPhone: "Phone",
      ValidMsgFirstName: "First Name",
      ValidMsgLastName: "Last Name",
      ValidMsgCompany: "Company"
    };

    return id && fieldMap[id] ? fieldMap[id] : id ?? "Unknown Field";
  }
}