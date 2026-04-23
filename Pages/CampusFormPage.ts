// Import Playwright Page class for browser automation
import { Page } from "@playwright/test";

// Page Object Model class for Coursera campus form page
export class CampusFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Fills form fields with test data, submits the form, and checks for validation errors
  async fillForm(testData: any) {
    await this.page.waitForSelector('input[name="FirstName"]');

    // Fill all text input fields with test data
    await this.page.locator('input[name="FirstName"]').fill(testData.firstName);
    await this.page.locator('input[name="LastName"]').fill(testData.lastName);
    await this.page.locator('input[name="Phone"]').fill(testData.phone);
    await this.page.locator('input[name="Email"]').fill(testData.email);
    await this.page.locator('input[name="Company"]').fill(testData.company);

    // Select all dropdown options
    await this.page.selectOption("#Institution_Type__c", testData.institutionType);
    await this.page.selectOption("#Title", testData.title);
    await this.page.selectOption("#Department", testData.department);
    await this.page.selectOption("#Self_Reported_Needs__c", testData.selfReportedNeeds);
    await this.page.selectOption("#Country", testData.country);

    await this.page.screenshot({ path: "screenshots/form-filled.png" });

    // Submit the form and wait for processing
    await this.page.locator("button:has-text('Submit')").click();
    await this.page.waitForTimeout(2000);

    await this.page.screenshot({ path: "screenshots/form-submitted.png" });

    await this.checkForErrors();
  }

  // Logs any validation error messages found on the form
  async checkForErrors() {
    const errorElements = this.page.locator(".mktoErrorMsg");
    const errorCount = await errorElements.count();

    if (errorCount > 0) {
      for (let i = 0; i < errorCount; i++) {
        const error = await errorElements.nth(i).innerText();
        console.log(error);
      }
    }
  }

  // Maps error message IDs to human-readable field names
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