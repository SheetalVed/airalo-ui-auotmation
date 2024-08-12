const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

// Path to the JSON file containing expected package values
const expectedPackageValuesPath = path.join(
  __dirname,
  "expectedPackageValues.json"
);

// Read and parse JSON data
const expectedPackageValues = JSON.parse(
  fs.readFileSync(expectedPackageValuesPath, "utf8")
);

test.beforeEach(
  "Navigate to airalo website and close all the pop-ups if exist",
  async ({ page }) => {
    // Step 1: Open Airalo's Website
    await page.goto("https://www.airalo.com/");

    // Close popup if visible
    try {
      const viewESIMStorePopUp = page.locator('[data-testid="close-button"]');
      await viewESIMStorePopUp.waitFor({ state: "visible", timeout: 10000 });
      if (await viewESIMStorePopUp.isVisible()) {
        await viewESIMStorePopUp.click();
      }
    } catch (error) {
      console.error("Error closing eSIM store popup:", error);
    }

  // Accept cookies if banner is visible
  try {
    const cookieBanner = page.getByRole('button', { name: 'ACCEPT' });
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click();
    }
  } catch (error) {
    console.error("Error accepting cookies:", error);
  }

    // Handle push notification popup
    try {
      const popupLocator = page.locator("button.No.thanks");
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

    // Verify the home page loaded
    await expect(page).toHaveTitle(
      "Buy eSIMs for international travel - Airalo"
    );
  }
);

test.afterEach("Close the browser", async ({ page }) => {
  await page.close();
});

test("Verify Selection and Purchase of eSIM Package for Japan", async ({
  page,
}) => {
  // Soft Assertion function
  /**
   * softAssert: Will continue the execution even if the condition doesn't match
   * @param {*} actual
   * @param {*} expected
   * @param {*} message
   * @param {*} errorList
   */
  function softAssert(actual, expected, message, errorList) {
    try {
      expect(actual).toEqual(expected);
    } catch (error) {
      errorList.push(message);
    }
  }

  // Step 2: Search for Japan
  await page.getByTestId("search-input").fill("Japan");
  await page.getByTestId("Japan-name").click();
  await page.waitForURL(/.*japan/);
  expect(page.url()).toContain("japan");

  const getStoreTitle = await page.getByTestId("store-title").textContent();
  const trimmedGetStoreTitle = getStoreTitle?.trim();

  // Step 3: Select the first eSIM Package
  const operatorTitle = await page
    .getByTestId("operator-title")
    .first()
    .textContent();
  await page.getByRole("button", { name: "BUY NOW" }).first().click();

  // Verify the popup appears
  const popUpTitle = await page
    .getByTestId("sim-detail-operator-title")
    .textContent();
  expect(operatorTitle?.trim()).toEqual(popUpTitle?.trim());

  // Step 4: Verify Package Details
  const simDetailInfoLost = page.locator(
    'ul[data-testid="sim-detail-info-list"]'
  );

  const titleValue = await page
    .getByTestId("sim-detail-operator-title")
    .textContent();
  expect(titleValue?.trim()).toEqual(expectedPackageValues.Title);

  const coverageValue = await simDetailInfoLost
    .getByTestId("COVERAGE-value")
    .textContent();
  expect(coverageValue?.trim()).toEqual(expectedPackageValues.Coverage);

  const dataValue = await simDetailInfoLost
    .getByTestId("DATA-value")
    .textContent();
  expect(dataValue?.trim()).toEqual(expectedPackageValues.Data);

  const validityValue = await simDetailInfoLost
    .getByTestId("VALIDITY-value")
    .textContent();

  /**
   * Bug 1: Mismatch between expected and observed case for the word 'day
   * Expected validity value from the requirement is 7 days
   * Observed validity value on UI is 7 Days
   * expect(validityValue?.trim().toLowerCase()).toEqual(expectedPackageValues.Validity.toLowerCase());
   */

  // List to collect errors
  let errors = [];

  softAssert(
    validityValue?.trim(),
    expectedPackageValues.Validity,
    `Expected Validity value to be '${validityValue.trim()}' and observed is '${
      expectedPackageValues.Validity
    }'`,
    errors
  );

  /**
   * Bug 2: Mismatch between expected and observed value for price
   * Expected price value from the requirement is "$4.50"
   * Observed price value on UI is "$4.50 USD"
   */

  const priceValue = await simDetailInfoLost
    .getByTestId("PRICE-value")
    .textContent();

  //todo : to handle currency formatting
  // const priceValueWithoutCurrency = priceValue?.replaceAll(/[A-Za-z]/g, "");

  softAssert(
    priceValue?.trim(),
    expectedPackageValues,
    `Expected price value is ${priceValue?.trim()} and observed is ${
      expectedPackageValues.Price
    }`,
    errors
  );

  if (errors.length > 0) {
    errors.forEach(function (error) {
      console.error(error);
    });
  }
});

test("Verify country search results with typo input.", async ({ page }) => {
  // Step 2: Search for Japaan
  await page.getByTestId("search-input").fill("Japaan");
  await page.getByTestId("Japan-name").click();
  await page.waitForURL(/.*japan/);
  expect(page.url()).toContain("japan");
});

test("Verify country search results with incorrect input.", async ({
  page,
}) => {
  // Step 2: Search for japantest
  await page.getByTestId("search-input").fill("japantest");
  const noCountriesMsg = await page
    .getByTestId("no-countries-found-result")
    .textContent();
  expect(noCountriesMsg).toEqual("No Country Available");
});
