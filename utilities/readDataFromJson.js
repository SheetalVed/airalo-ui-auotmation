const fs = require("fs");
const path = require("path")

// Path to the JSON file containing expected package values
const expectedPackageValuesPath = path.join(__dirname, "expectedPackageValues.json")

// Read and parse JSON data
const expectedPackageValues = JSON.parse(fs.readFileSync(expectedPackageValuesPath,'utf-8'))