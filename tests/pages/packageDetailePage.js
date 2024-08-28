import { Page,expect } from "@playwright/test";
import {expectedPackageValues} from '../../utilities/readDataFromJson'

export class PackageDetailsPage {
  /**
   *
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async selectFirstEsimPackage(){
  await this.page.pause()
    const operatorTitle = await this.page
    .getByTestId("operator-title")
    .first()
    .textContent();
    await this.page.getByRole("button", { name: "BUY NOW" }).first().click();
    const popUpTitle = await this.page
    .getByTestId("sim-detail-operator-title")
    .textContent();
  expect(operatorTitle?.trim()).toEqual(popUpTitle?.trim())
  }

  async verifyPackageDetails(detailToVerify,expectedValue) {
    const simDetailInfoLost = this.page.locator(
      'ul[data-testid="sim-detail-info-list"]'
    );
    const detailToVerifyUpperCase = detailToVerify.toUpperCase();
    console.log(`${detailToVerifyUpperCase}-value`)
    const packageDetailToVerify = await simDetailInfoLost
      .getByTestId(`${detailToVerifyUpperCase}-value`)
      .textContent();
    expect(packageDetailToVerify?.trim()).toEqual(expectedValue);
  }

  //forEach here is not helpful 
  /**
   * forEach does not wait: The main caveat is that the forEach loop doesn't wait for the async operations to 
   * finish before moving on to the next iteration. 
   * This might cause issues if you expect all operations to finish before proceeding with the rest of your test.
   */
  async verifyPackageDetailsfromJson1(data) {
    console.log(data)
     Object.entries(data).forEach(async([detailToVerify,expectedValue])=>{
      console.log(`${detailToVerify}:${expectedValue}`)
   // const simDetailInfoLost = this.page.locator('div.sim-detail-info>ul[data-testid="sim-detail-info-list"]');

    const simDetailInfoLost = this.page.locator(
      'ul[data-testid="sim-detail-info-list"]'
    );
        const detailToVerifyUpperCase = detailToVerify.toUpperCase();
        console.log(`${detailToVerifyUpperCase}-value`)
        const packageDetailToVerify = await simDetailInfoLost
      .getByTestId(`${detailToVerifyUpperCase}-value`)
      .textContent();
      expect(packageDetailToVerify?.trim()).toEqual(expectedValue);
    })

  }

  /**
   * map + Promise.all waits: By using map with Promise.all, you ensure that all asynchronous operations 
   * are completed before continuing. 
   * This is why it's often recommended when dealing with async operations in a loop.
   */

  async verifyPackageDetailsfromJson(data) {
    console.log(data)
     await Promise.all(Object.entries(data).map(async([detailToVerify,expectedValue])=>{
      console.log(`${detailToVerify}:${expectedValue}`)

    const simDetailInfoLost = this.page.locator(
      'ul[data-testid="sim-detail-info-list"]'
    );
        const detailToVerifyUpperCase = detailToVerify.toUpperCase();
        console.log(`${detailToVerifyUpperCase}-value`)
        const packageDetailToVerify = await simDetailInfoLost
      .getByTestId(`${detailToVerifyUpperCase}-value`)
      .textContent();
      expect(packageDetailToVerify?.trim()).toEqual(expectedValue);
    }))
  }
  }
