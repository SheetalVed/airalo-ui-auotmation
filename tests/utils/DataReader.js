const fs = require('fs');
const path = require('path');

export class DataReader {
  static readJsonFile(filePath) {
    const fullPath = path.join(__dirname, filePath);
    const data = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(data);
  }
}
