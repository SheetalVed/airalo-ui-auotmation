# 🧪 Playwright Test Automation for Airalo Website

Welcome to the Playwright test automation suite for Airalo's website! This repository contains end-to-end tests to ensure key functionalities like navigation, search, and package selection work as expected.

## 🚀 Quick Start

### Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v14.x or higher) - [Download Node.js](https://nodejs.org/)

### Installation

1. **Clone the Repository**


         git clone https://github.com/your-username/airalo-playwright-tests.git

         cd airaloUIAutomation

2. **Install Dependencies**


         npm install

3. **Install Browsers**


         npx playwright install

### 🧩 Running Tests
To execute the test suite 

🔹Using Chrome Browser in Headless Mode (Parallel Execution), run:


      npx playwright test --project=chromium


🔹Using Chrome Browser in Headed Mode (Parallel Execution), run:


      npx playwright test --project=chromium --headed


🔹Using Chrome Browser in Headless Mode (Serial Execution), run:


      npx playwright test --project=chromium --workers=1


🔹Using Chrome Browser in Headed Mode (Serial Execution), run:


      npx playwright test --project=chromium --headed --workers=1

🔹To run a specific test in the desired file:, run:


      npx playwright test my-tests.spec.js --grep "Test Case 2"


Replace my-tests.spec.js with your spec file name and "Test Case 2" with the test name or pattern.


The test results will be available in the playwright-report directory. Open index.html in your browser to view detailed results.

### 🧠 Approach to Implement Test Cases
#### 1. Open Airalo's Website
Approach:

🔹Launch a browser instance and navigate to Airalo's homepage.

🔹Close all the popups if exist(view eSIM store , accept cookies and push notification pop-ups).

🔹Ensure that the website loads correctly by verifying the page title.

#### **Note:**
Since these steps are common across all the test cases, they are placed inside the `test.beforeEach` hook to ensure a consistent starting point for each test. This avoids repetition and keeps the test cases focused on their specific scenarios.

#### 2. Search for Japan
Approach:

🔹Locate the search field on the home page.

🔹Input the search term "Japan" and select the appropriate destination from the autocomplete suggestions.

🔹Verify that the search results page loads with the expected content.

#### 3. Select an eSIM Package
Approach:

🔹On the search results page, identify and select the first eSIM package and click on the "Buy Now" button.

🔹Check that the user is redirected to the expected page with a pop-up window with selected sim detail operator name.

#### 4. Verify eSIM Package Details
Approach:

🔹On appeared pop-up, verify the accuracy of the details shown, such as title, coverage, data, validity, and price.

🔹Ensure that these details match the expected values provided.

🔹Expected values are provided in the JSON file [`expectedPackageValues.json`](./tests/expectedPackageValues.json), located in the `tests` directory.    

#### 5. Verify country search results with typo input.
Approach:

🔹Input the search term "Japaan"

🔹Verify appropriate destination "Japan" display in the “Local” section in the autocomplete options.

🔹Verify that the search results page loads with the expected content.

#### 6. Verify country search results with incorrect input.
Approach:

🔹Input the search term "japantest"

🔹Verify messgae should get displays "No Country Available"


### 📊 Reporting
Test results are saved in the playwright-report directory. Open index.html in this directory to view the test results.

### 🛠️ Troubleshooting
Browser version mismatch: Run npx playwright install to ensure all required browsers are installed.
Test execution issues: Verify that all dependencies are installed correctly with npm install.