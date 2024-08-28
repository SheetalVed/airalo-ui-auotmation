import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { PackageDetailsPage } from "../pages/packageDetailePage";

test.beforeEach("Navigate to airalo Website", async ({ page }) => {
  const homepage = new HomePage(page);
  await homepage.navigate();
  await homepage.closePopUps();
  await expect(page).toHaveTitle("Buy eSIMs for international travel - Airalo");
});

test("navigate", async ({ page }) => {
  const homepage = new HomePage(page);
  const packageDetails = new PackageDetailsPage(page);
  await homepage.searchCountry("Japan");
  await packageDetails.selectFirstEsimPackage();

  //Verify Each Value

  await packageDetails.verifyPackageDetails("Coverage", "Japan");
  await packageDetails.verifyPackageDetails("Data", "1 GB");
  await packageDetails.verifyPackageDetails("Validity", "7 Days");
  await packageDetails.verifyPackageDetails("Price", "4.50 €");

  //Verify data in json format

  await packageDetails.verifyPackageDetailsfromJson({
    Coverage: "Japan",
    Data: "1 GB",
    Validity: "7 Days",
    Price: "4.50 €",
  });
});
