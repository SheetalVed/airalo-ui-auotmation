import {Page, expect} from '@playwright/test'

export class HomePage{
  /**
   * 
   * @param {Page} page 
   */
  constructor(page){
    this.page = page
    
  }

  async navigate() {
    await this.page.goto("https://www.airalo.com/");
    }

  async closePopUps(){
    try {
      const viewESIMStorePopUp = this.page.locator('[data-testid="close-button"]');
      await viewESIMStorePopUp.waitFor({ state: "visible", timeout: 500 });
      if (await viewESIMStorePopUp.isVisible()) {
        await viewESIMStorePopUp.click();
      }
    } catch (error) {
      console.error("Error closing eSIM store popup:", error);
    }

    // Accept cookies if banner is visible
    try {
      const cookieBanner = this.page.getByRole("button", { name: "ACCEPT" });
      if (await cookieBanner.isVisible()) {
        await cookieBanner.click();
      }
    } catch (error) {
      console.error("Error accepting cookies:", error);
    }

    // Handle push notification popup
    try {
      const popupLocator = this.page.locator("button.No.thanks");
      await popupLocator.waitFor({ state: "visible", timeout: 9000 });
      if (await popupLocator.isVisible()) {
        console.log("Popup is visible. Clicking on it.");
        await popupLocator.click();
      } else {
        console.log("Popup is not visible. Proceeding without clicking.");
      }
    } catch (error) {
      console.log(
        "Popup did not appear within the timeout. Proceeding with the test."
      );
      console.error("Error:", error);
    }
  }

  async searchCountry(countryName) {
    // this.searchInput = this.page.getByTestId('search-input')
    // await this.searchInput.fill(countryName);
    
    try{await this.page.locator('input[data-testid=search-input]').fill(countryName);}
    catch(error){
console.log(error)
    }
    await this.page.getByTestId(`${countryName}-name`).click();
    await this.page.waitForURL(new RegExp(`.*${countryName.toLowerCase()}`));
    expect(this.page.url()).toContain(countryName.toLowerCase());
  }
}