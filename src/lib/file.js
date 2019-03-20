const fs = require('fs').promises;

const getDataFromFile = async (fileName) => fs.readFile(fileName);

const writeDataToFile = async (fileName, fileData) => fs.writeFile(fileName, fileData);

module.exports = {
  getDataFromFile,
  writeDataToFile
};
