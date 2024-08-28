const { test: baseTest } = require("@playwright/test");
const { generateAuthToken } = require("../API/auth.js");

// Cache the token to ensure it's only generated once
let cachedToken = null;

const test = baseTest.extend({
  accessToken: async ({}, use) => {
    if (!cachedToken) {
      cachedToken = await generateAuthToken();
    }
    await use(cachedToken);
  },
});

export { test };
